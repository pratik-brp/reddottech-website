import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import express from "express";
import { initDb, query, get, run, dbConfig } from "./db.js";
import { requireAuth, authHandlers, getUserForToken, extractToken } from "./auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../public/uploads");
const receiptsDir = path.resolve(__dirname, "../storage/receipts");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(receiptsDir)) {
  fs.mkdirSync(receiptsDir, { recursive: true });
}

const app = express();
// Enable trust proxy for correct IP rate-limiting behind cPanel / LiteSpeed reverse proxies (TC-12)
app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;

// Restrict CORS to known origins
const allowedOrigins = new Set(
  (
    process.env.CORS_ORIGINS ||
    "http://localhost:3000,http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:4173,http://127.0.0.1:3000,http://127.0.0.1:5173,http://127.0.0.1:5175,https://reddottech.com.np,https://www.reddottech.com.np,http://reddottech.com.np"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    if (allowedOrigins.has(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      return res.status(403).json({ success: false, error: "Origin not allowed by CORS policy." });
    }
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https:; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-ancestors 'self';",
  );
  next();
});

app.use(express.json({ limit: "5mb" }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ success: false, error: "Invalid JSON body provided." });
  }
  next();
});
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use("/uploads", express.static(uploadsDir));

// Rate limiter for public endpoints (in-memory sliding window)
const rateLimitMap = new Map();
function createRateLimiter({
  windowMs = 60 * 1000,
  max = 20,
  message = "Too many requests. Please try again later.",
} = {}) {
  return (req, res, next) => {
    const ip =
      req.ip ||
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";
    const key = `${req.baseUrl || ""}${req.path}:${ip}`;
    const now = Date.now();
    const entry = rateLimitMap.get(key) || { count: 0, resetTime: now + windowMs };

    if (now > entry.resetTime) {
      entry.count = 0;
      entry.resetTime = now + windowMs;
    }

    entry.count += 1;
    rateLimitMap.set(key, entry);

    if (rateLimitMap.size > 5000) {
      for (const [k, v] of rateLimitMap.entries()) {
        if (now > v.resetTime) rateLimitMap.delete(k);
      }
    }

    if (entry.count > max) {
      return res.status(429).json({ success: false, error: message });
    }
    next();
  };
}

const formLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 15,
  message: "Too many submissions. Please wait a moment.",
});
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "Too many login attempts. Please try again in 15 minutes.",
});

// Helper to mask emails for public endpoints (TC-10)
function maskEmail(email) {
  if (!email || typeof email !== "string") return "";
  const parts = email.split("@");
  if (parts.length !== 2) return email.slice(0, 2) + "***";
  const [user, domain] = parts;
  const maskedUser = user.length <= 2 ? user[0] + "***" : user[0] + "***" + user[user.length - 1];
  const domainParts = domain.split(".");
  const maskedDomain = domainParts
    .map((part, i) =>
      i === domainParts.length - 1
        ? part
        : part.length <= 2
          ? part[0] + "***"
          : part[0] + "***" + part[part.length - 1],
    )
    .join(".");
  return `${maskedUser}@${maskedDomain}`;
}

// Helper for magic byte validation (TC-05)
function validateImageMagicBytes(buffer, mime) {
  if (!buffer || buffer.length < 4) return false;
  if (mime === "image/jpeg" || mime === "image/jpg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mime === "image/png") {
    return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  }
  if (mime === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }
  if (mime === "application/pdf") {
    return buffer.subarray(0, 4).toString("ascii") === "%PDF";
  }
  return false;
}

// Helper for generating collision-free course slugs (TC-08)
async function generateUniqueCourseSlug(name, existingId = null) {
  let baseSlug = String(name || "course")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!baseSlug) baseSlug = "course";

  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existing = await get(
      "SELECT id FROM courses WHERE slug = ?" + (existingId ? " AND id <> ?" : ""),
      existingId ? [slug, existingId] : [slug],
    );
    if (!existing) return slug;
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
}

// Helper for pagination query parameters (TC-15)
function getPaginationParams(req) {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);
  if (!isNaN(page) && page > 0 && !isNaN(limit) && limit > 0) {
    const safeLimit = Math.min(limit, 200);
    const safeOffset = (page - 1) * safeLimit;
    return { isPaginated: true, page, limit: safeLimit, offset: safeOffset };
  }
  return { isPaginated: false, page: 1, limit: 1000, offset: 0 };
}

// Boot initialization: connect to MySQL database
(async () => {
  try {
    await initDb();
  } catch (err) {
    console.error("[Boot Error] Failed to initialize MySQL:", err.message);
  }
})();

// Health Check Endpoint
app.get("/api/health", async (req, res) => {
  try {
    const row = await get("SELECT 1 as is_alive");
    res.json({
      status: "ok",
      database: "MySQL",
      is_alive: Boolean(row?.is_alive),
      message: "Red Dot MySQL Backend Server is active",
    });
  } catch {
    res.status(500).json({
      status: "error",
      database: "MySQL",
      error: "Internal server error",
    });
  }
});

// Image Upload Endpoint (Admin only)
app.post("/api/upload", formLimiter, requireAuth, (req, res) => {
  try {
    const { filename, base64Data } = req.body || {};
    if (!base64Data || typeof base64Data !== "string") {
      return res.status(400).json({ success: false, error: "No image data provided." });
    }

    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({
        success: false,
        error: "Invalid image format. Expected data URI (e.g. data:image/jpeg;base64,...)",
      });
    }

    const mime = matches[1].toLowerCase();
    let ext = ".jpg";
    if (mime === "image/jpeg" || mime === "image/jpg") ext = ".jpg";
    else if (mime === "image/webp") ext = ".webp";
    else if (mime === "image/png") ext = ".png";
    else {
      return res
        .status(400)
        .json({ success: false, error: "Only JPG, PNG, and WebP images are allowed." });
    }
    const buffer = Buffer.from(matches[2], "base64");

    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ success: false, error: "Image exceeds 5MB size limit." });
    }
    if (!validateImageMagicBytes(buffer, mime)) {
      return res.status(400).json({
        success: false,
        error: "Invalid image file header. Corrupted or unauthorized format.",
      });
    }

    const cleanName = (filename || "upload")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_");
    const uniqueName = `${cleanName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${uniqueName}`;
    res.json({ success: true, url: publicUrl, filename: uniqueName });
  } catch (err) {
    console.error("[Upload Error]", err);
    res.status(500).json({ success: false, error: "Failed to upload file." });
  }
});

// Payment Receipt Screenshot Upload Endpoint (Public Rate-Limited, Protected Storage - TC-03, TC-05)
app.post("/api/upload-receipt", formLimiter, (req, res) => {
  try {
    const { filename, base64Data } = req.body || {};
    if (!base64Data || typeof base64Data !== "string") {
      return res.status(400).json({ success: false, error: "No receipt image data provided." });
    }

    const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({
        success: false,
        error: "Invalid image format. Expected data URI (e.g. data:image/jpeg;base64,...)",
      });
    }

    const mime = matches[1].toLowerCase();
    let ext = ".jpg";
    if (mime === "image/jpeg" || mime === "image/jpg") ext = ".jpg";
    else if (mime === "image/webp") ext = ".webp";
    else if (mime === "image/png") ext = ".png";
    else if (mime === "application/pdf") ext = ".pdf";
    else {
      return res.status(400).json({
        success: false,
        error: "Only JPG, PNG, WebP, or PDF payment receipts are allowed.",
      });
    }
    const buffer = Buffer.from(matches[2], "base64");

    // Enforce 2.5MB max size limit on public receipt uploads (TC-05)
    if (buffer.length > 2.5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        error:
          "Receipt file size exceeds 2.5MB limit. Please compress or take a smaller screenshot.",
      });
    }

    // Verify true magic bytes of the file content (TC-05)
    if (!validateImageMagicBytes(buffer, mime)) {
      return res.status(400).json({
        success: false,
        error: "Corrupted or invalid file format. File signature does not match image/PDF header.",
      });
    }

    const cleanName = (filename || "receipt")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_");
    const uniqueName = `receipt_${cleanName}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}${ext}`;

    // Save to private storage/receipts directory instead of public web root (TC-03)
    const filePath = path.join(receiptsDir, uniqueName);
    fs.writeFileSync(filePath, buffer);

    const protectedUrl = `/api/admin/receipts/${uniqueName}`;
    res.json({ success: true, url: protectedUrl, filename: uniqueName });
  } catch (err) {
    console.error("[Receipt Upload Error]", err);
    res.status(500).json({ success: false, error: "Failed to upload payment receipt." });
  }
});

// Authenticated Admin Endpoint to Serve Private Receipts (TC-03)
app.get("/api/admin/receipts/:filename", requireAuth, (req, res) => {
  try {
    const rawFilename = path.basename(req.params.filename || "");
    let safePath = path.resolve(receiptsDir, rawFilename);

    // Fallback: check uploads directory if file was created before migration to private storage
    if (!fs.existsSync(safePath)) {
      const legacyPath = path.resolve(uploadsDir, rawFilename);
      if (fs.existsSync(legacyPath)) {
        safePath = legacyPath;
      }
    }

    if (!fs.existsSync(safePath)) {
      return res.status(404).json({ success: false, error: "Receipt file not found." });
    }

    const ext = path.extname(safePath).toLowerCase();
    const mime =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".pdf"
            ? "application/pdf"
            : ext === ".svg"
              ? "image/svg+xml"
              : "image/jpeg";

    res.setHeader("Content-Type", mime);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "private, max-age=3600");
    if (ext === ".pdf") {
      res.setHeader("Content-Disposition", `inline; filename="${rawFilename}"`);
    }
    fs.createReadStream(safePath).pipe(res);
  } catch (err) {
    console.error("[Receipt Serve Error]", err);
    res.status(500).json({ success: false, error: "Failed to load receipt file." });
  }
});

// -------------------------------------------------------------------
// AUTH API
// -------------------------------------------------------------------
app.post("/api/auth/login", authLimiter, authHandlers.login);
app.post("/api/auth/logout", authHandlers.logout);
app.get("/api/auth/me", authHandlers.me);
app.post("/api/auth/change-password", authHandlers.changePassword);
app.post("/api/auth/change-email", authHandlers.changeEmail);
app.post("/api/auth/forgot-password", authLimiter, authHandlers.forgotPassword);
app.post("/api/auth/reset-password", authLimiter, authHandlers.resetPasswordWithToken);

// -------------------------------------------------------------------
// 1. COURSES API (TC-08, TC-16, TC-17)
// -------------------------------------------------------------------
app.get("/api/courses", async (req, res) => {
  try {
    const token = extractToken(req);
    const adminUser = await getUserForToken(token);
    const { isPaginated, page, limit, offset } = getPaginationParams(req);

    const baseWhere = adminUser ? "" : "WHERE status = 'published'";
    const totalRow = await get(`SELECT COUNT(*) as count FROM courses ${baseWhere}`);
    const total = Number(totalRow?.count) || 0;

    const querySql = isPaginated
      ? `SELECT * FROM courses ${baseWhere} ORDER BY created_at DESC LIMIT ? OFFSET ?`
      : `SELECT * FROM courses ${baseWhere} ORDER BY created_at DESC`;

    const courses = isPaginated ? await query(querySql, [limit, offset]) : await query(querySql);

    const formatted = courses.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      longDescription: c.long_description,
      thumbnail: c.thumbnail,
      bannerImage: c.banner_image,
      instructorName: c.instructor_name,
      instructorTitle: c.instructor_title,
      instructorImage: c.instructor_image,
      instructorDetail: c.instructor_detail,
      duration: c.duration,
      startDate: c.start_date,
      price: Number(c.price) || 0,
      delivery: c.delivery,
      mode: c.mode,
      language: c.language,
      skillLevel: c.skill_level,
      category: c.category,
      certification: c.certification,
      requirements: c.requirements,
      curriculum: c.curriculum,
      status: c.status,
    }));

    if (isPaginated) {
      return res.json({
        success: true,
        data: formatted,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      });
    }
    res.json({ success: true, data: formatted });
  } catch (err) {
    console.error("[Courses API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch courses." });
  }
});

app.get("/api/courses/:id", async (req, res) => {
  try {
    const token = extractToken(req);
    const adminUser = await getUserForToken(token);

    const querySql = adminUser
      ? "SELECT * FROM courses WHERE id = ? OR slug = ?"
      : "SELECT * FROM courses WHERE (id = ? OR slug = ?) AND status = 'published'";

    const course = await get(querySql, [req.params.id, req.params.id]);

    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    const formatted = {
      id: course.id,
      name: course.name,
      slug: course.slug,
      description: course.description,
      longDescription: course.long_description,
      thumbnail: course.thumbnail,
      bannerImage: course.banner_image,
      instructorName: course.instructor_name,
      instructorTitle: course.instructor_title,
      instructorImage: course.instructor_image,
      instructorDetail: course.instructor_detail,
      duration: course.duration,
      startDate: course.start_date,
      price: Number(course.price) || 0,
      delivery: course.delivery,
      mode: course.mode,
      language: course.language,
      skillLevel: course.skill_level,
      category: course.category,
      certification: course.certification,
      requirements: course.requirements,
      curriculum: course.curriculum,
      status: course.status,
    };

    res.json({ success: true, data: formatted });
  } catch (err) {
    console.error("[Courses API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch course details." });
  }
});

app.post("/api/courses", requireAuth, async (req, res) => {
  try {
    const body = req.body || {};
    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Course name is required." });
    }
    if (body.name.length > 255) {
      return res
        .status(400)
        .json({ success: false, error: "Course name cannot exceed 255 characters." });
    }

    const id = body.id || `course-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const slug = await generateUniqueCourseSlug(body.name);

    await run(
      `INSERT INTO courses (
        id, name, slug, description, long_description, thumbnail, banner_image,
        instructor_name, instructor_title, instructor_image, instructor_detail,
        duration, start_date, price, delivery, mode, language, skill_level,
        category, certification, requirements, curriculum, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        id,
        body.name.trim(),
        slug,
        body.description || "",
        body.longDescription || body.description || "",
        body.thumbnail !== undefined ? String(body.thumbnail) : "",
        body.bannerImage !== undefined
          ? String(body.bannerImage)
          : body.banner_image
            ? String(body.banner_image)
            : "",
        body.instructorName ? String(body.instructorName).slice(0, 255) : "Instructor",
        body.instructorTitle ? String(body.instructorTitle).slice(0, 255) : "Faculty Lead",
        body.instructorImage !== undefined
          ? String(body.instructorImage)
          : body.instructor_image
            ? String(body.instructor_image)
            : "",
        body.instructorDetail || "",
        body.duration ? String(body.duration).slice(0, 100) : "4 weeks",
        body.startDate ? String(body.startDate).slice(0, 100) : "Rolling Admission",
        Number(body.price) || 0,
        body.delivery ? String(body.delivery).slice(0, 50) : "online",
        body.mode ? String(body.mode).slice(0, 100) : "Instructor-led",
        body.language ? String(body.language).slice(0, 100) : "English",
        body.skillLevel ? String(body.skillLevel).slice(0, 50) : "beginner",
        body.category ? String(body.category).slice(0, 100) : "General",
        body.certification ? String(body.certification).slice(0, 100) : "Red Dot Certified",
        body.requirements || "",
        body.curriculum || "",
        body.status ? String(body.status).slice(0, 50) : "published",
      ],
    );

    res.json({ success: true, message: "Course created successfully in MySQL", id, slug });
  } catch (err) {
    console.error("[Courses API Error]", err);
    res.status(500).json({ success: false, error: "Failed to create course." });
  }
});

app.put("/api/courses/:id", requireAuth, async (req, res) => {
  try {
    const body = req.body || {};
    const existing = await get("SELECT id, name, slug FROM courses WHERE id = ?", [req.params.id]);
    if (!existing) {
      return res.status(404).json({ success: false, error: "Course not found." });
    }

    if (body.name && body.name.length > 255) {
      return res
        .status(400)
        .json({ success: false, error: "Course name cannot exceed 255 characters." });
    }

    let slug = existing.slug;
    if (body.name && body.name !== existing.name) {
      slug = await generateUniqueCourseSlug(body.name, req.params.id);
    }

    const instructorImage =
      body.instructorImage !== undefined
        ? String(body.instructorImage)
        : body.instructor_image !== undefined
          ? String(body.instructor_image)
          : "";
    const bannerImage =
      body.bannerImage !== undefined
        ? String(body.bannerImage)
        : body.banner_image !== undefined
          ? String(body.banner_image)
          : "";
    const thumbnail =
      body.thumbnail !== undefined
        ? String(body.thumbnail)
        : body.thumbnail_image !== undefined
          ? String(body.thumbnail_image)
          : "";

    await run(
      `UPDATE courses SET
        name = ?,
        slug = ?,
        category = ?,
        description = ?,
        long_description = ?,
        thumbnail = ?,
        banner_image = ?,
        instructor_name = ?,
        instructor_title = ?,
        instructor_image = ?,
        instructor_detail = ?,
        duration = ?,
        start_date = ?,
        price = ?,
        delivery = ?,
        mode = ?,
        language = ?,
        skill_level = ?,
        certification = ?,
        status = ?,
        curriculum = ?,
        requirements = ?
      WHERE id = ?`,
      [
        body.name ? String(body.name).trim() : existing.name,
        slug,
        body.category ? String(body.category).slice(0, 100) : "Professional Certification",
        body.description || "",
        body.longDescription || body.description || "",
        thumbnail,
        bannerImage,
        body.instructorName ? String(body.instructorName).slice(0, 255) : "Instructor",
        body.instructorTitle ? String(body.instructorTitle).slice(0, 255) : "Faculty Lead",
        instructorImage,
        body.instructorDetail || "",
        body.duration ? String(body.duration).slice(0, 100) : "4 weeks",
        body.startDate ? String(body.startDate).slice(0, 100) : "Rolling Admission",
        Number(body.price) || 0,
        body.delivery ? String(body.delivery).slice(0, 50) : "online",
        body.mode ? String(body.mode).slice(0, 100) : "Instructor-led",
        body.language ? String(body.language).slice(0, 100) : "English",
        body.skillLevel ? String(body.skillLevel).slice(0, 50) : "beginner",
        body.certification ? String(body.certification).slice(0, 100) : "PECP Certified",
        body.status ? String(body.status).slice(0, 50) : "published",
        body.curriculum || "",
        body.requirements || "",
        req.params.id,
      ],
    );

    res.json({ success: true, message: "Course updated successfully in MySQL", slug });
  } catch (err) {
    console.error("[Courses API Error]", err);
    res.status(500).json({ success: false, error: "Failed to update course." });
  }
});

app.delete("/api/courses/:id", requireAuth, async (req, res) => {
  try {
    const result = await run("DELETE FROM courses WHERE id = ?", [req.params.id]);
    res.json({ success: true, deleted: result.affectedRows });
  } catch (err) {
    console.error("[Courses API Error]", err);
    res.status(500).json({ success: false, error: "Failed to delete course." });
  }
});

// -------------------------------------------------------------------
// 2. CERTIFICATES API (TC-02, TC-10)
// -------------------------------------------------------------------
app.get("/api/certificates", requireAuth, async (req, res) => {
  try {
    const { isPaginated, page, limit, offset } = getPaginationParams(req);
    const totalRow = await get("SELECT COUNT(*) as count FROM certificates");
    const total = Number(totalRow?.count) || 0;

    const querySql = isPaginated
      ? "SELECT * FROM certificates ORDER BY created_at DESC LIMIT ? OFFSET ?"
      : "SELECT * FROM certificates ORDER BY created_at DESC";

    const certs = isPaginated ? await query(querySql, [limit, offset]) : await query(querySql);

    if (isPaginated) {
      return res.json({
        success: true,
        data: certs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      });
    }
    res.json({ success: true, data: certs });
  } catch (err) {
    console.error("[Certificates API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch certificates." });
  }
});

app.post("/api/certificates/claim", formLimiter, async (req, res) => {
  try {
    const {
      name,
      email,
      school,
      track,
      course_name,
      certificate_id,
      organization,
      role,
      department,
    } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ success: false, error: "Name and Email are required." });
    }

    if (String(name).length > 255 || String(email).length > 255) {
      return res
        .status(400)
        .json({ success: false, error: "Name or email exceeds maximum allowed length." });
    }

    // Prevent overwriting existing certificates or minting duplicate IDs (TC-02)
    if (certificate_id) {
      const existingCert = await get("SELECT id FROM certificates WHERE certificate_id = ?", [
        String(certificate_id).trim(),
      ]);
      if (existingCert) {
        return res.status(409).json({
          success: false,
          error: "A certificate with this ID already exists. Duplicate issuance is not permitted.",
        });
      }
    }

    const completed_at = new Date().toISOString().split("T")[0];
    const resolvedTrack = track ? String(track).slice(0, 50).toLowerCase() : "foundations";
    const resolvedCourseName =
      course_name ||
      (resolvedTrack === "healthcare"
        ? "AI for Healthcare Professionals"
        : resolvedTrack === "finance"
          ? "AI for Financial Professionals"
          : resolvedTrack === "finance-advanced"
            ? "Advanced AI for Financial & Banking Professionals"
            : resolvedTrack === "pecp"
              ? "Professional Executive Certificate"
              : "AI Foundations: General AI Literacy");

    // For paid tracks, ensure caller is authenticated admin OR has a verified AI lead enrollment in database (TC-02)
    if (resolvedTrack !== "foundations") {
      const token = extractToken(req);
      const adminUser = await getUserForToken(token);
      if (!adminUser) {
        const lead = await get(
          "SELECT id FROM ai_leads WHERE LOWER(email) = LOWER(?) AND LOWER(track) = LOWER(?) AND status = 'verified'",
          [String(email).trim(), resolvedTrack],
        );
        if (!lead) {
          return res.status(403).json({
            success: false,
            error: "Certificate claiming requires verified course enrollment for this track.",
          });
        }
      }
    }

    // Cryptographically secure unique certificate ID generation
    const autoCertCode =
      certificate_id && String(certificate_id).trim().length > 0
        ? String(certificate_id).trim().slice(0, 100)
        : `RDT-${resolvedTrack.toUpperCase()}-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

    const result = await run(
      `INSERT INTO certificates (
        name, email, school, track, course_name, certificate_id, organization, role, department, completed_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        String(name).trim().slice(0, 255),
        String(email).trim().slice(0, 255),
        school || organization
          ? String(school || organization).slice(0, 255)
          : "Red Dot Technologies",
        resolvedTrack,
        String(resolvedCourseName).slice(0, 255),
        autoCertCode,
        organization || school ? String(organization || school).slice(0, 255) : null,
        role ? String(role).slice(0, 100) : null,
        department ? String(department).slice(0, 100) : null,
        completed_at,
      ],
    );

    res.json({
      success: true,
      id: result.insertId,
      name,
      email: maskEmail(email),
      school,
      track: resolvedTrack,
      course_name: resolvedCourseName,
      certificate_id: autoCertCode,
      completed_at,
    });
  } catch (err) {
    console.error("[Certificates API Error]", err);
    res.status(500).json({ success: false, error: "Failed to claim certificate." });
  }
});

app.delete("/api/certificates/:id", requireAuth, async (req, res) => {
  try {
    const result = await run("DELETE FROM certificates WHERE id = ?", [req.params.id]);
    res.json({ success: true, deleted: result.affectedRows });
  } catch (err) {
    console.error("[Certificates API Error]", err);
    res.status(500).json({ success: false, error: "Failed to delete certificate." });
  }
});

// Certificate Verification (Public Verification Endpoint - TC-10 Privacy & Exact Match)
app.get("/api/certificates/verify/:query", formLimiter, async (req, res) => {
  try {
    const rawQuery = String(req.params.query || "").trim();
    if (!rawQuery) {
      return res
        .status(400)
        .json({ success: false, error: "Verification identifier is required." });
    }

    // Exact match on certificate ID or numeric ID only (prevent enumeration)
    const numMatch = rawQuery.match(/^(\d+)$/);
    const extractedNum = numMatch ? parseInt(numMatch[1], 10) : 0;

    const cert = await get(
      `SELECT id, name, email, school, completed_at, created_at, track, course_name, certificate_id, organization, role, department 
       FROM certificates 
       WHERE certificate_id = ? 
          OR id = ? 
       ORDER BY id DESC 
       LIMIT 1`,
      [rawQuery, extractedNum],
    );

    if (!cert) {
      return res.status(404).json({
        success: false,
        verified: false,
        error:
          "Certificate record not found in the official registry. Please verify the entered ID.",
      });
    }

    const trackLabel =
      cert.track === "healthcare"
        ? "AI for Healthcare Professionals"
        : cert.track === "finance"
          ? "AI for Financial & Banking Professionals"
          : cert.course_name || "AI Foundations: General AI Literacy";

    const certCode =
      cert.certificate_id || `RDT-${String(cert.track || "AI").toUpperCase()}-${cert.id}`;

    res.json({
      success: true,
      verified: true,
      data: {
        id: cert.id,
        name: cert.name,
        email: maskEmail(cert.email),
        school: cert.school,
        track: cert.track,
        courseName: cert.course_name || trackLabel,
        certificateId: certCode,
        organization: cert.organization,
        role: cert.role,
        department: cert.department,
        completedAt: cert.completed_at || cert.created_at,
        issuedAt: cert.created_at,
        issuer:
          "Red Dot Technologies in academic collaboration with University of South Carolina Upstate (USA)",
        status: "Valid & Authenticated",
        verificationUrl: `https://reddottech.com.np/verify?id=${encodeURIComponent(certCode)}`,
      },
    });
  } catch (err) {
    console.error("[Verify API Error]", err);
    res.status(500).json({ success: false, error: "Verification lookup failed." });
  }
});

// -------------------------------------------------------------------
// 3. CONTACTS API (TC-16)
// -------------------------------------------------------------------
app.get("/api/contacts", requireAuth, async (req, res) => {
  try {
    const { isPaginated, page, limit, offset } = getPaginationParams(req);
    const totalRow = await get("SELECT COUNT(*) as count FROM contacts");
    const total = Number(totalRow?.count) || 0;

    const querySql = isPaginated
      ? "SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?"
      : "SELECT * FROM contacts ORDER BY created_at DESC";

    const contacts = isPaginated ? await query(querySql, [limit, offset]) : await query(querySql);

    if (isPaginated) {
      return res.json({
        success: true,
        data: contacts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      });
    }
    res.json({ success: true, data: contacts });
  } catch (err) {
    console.error("[Contacts API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch contacts." });
  }
});

app.post("/api/contacts", formLimiter, async (req, res) => {
  try {
    const { first_name, last_name, email, phone, subject, message } = req.body || {};
    if (!first_name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing required contact fields" });
    }

    if (
      String(first_name).length > 100 ||
      (last_name && String(last_name).length > 100) ||
      String(email).length > 255 ||
      (phone && String(phone).length > 50) ||
      (subject && String(subject).length > 255)
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Field lengths exceed maximum allowed limit." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({ success: false, error: "Invalid email address format." });
    }

    const result = await run(
      "INSERT INTO contacts (first_name, last_name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [
        String(first_name).trim().slice(0, 100),
        last_name ? String(last_name).trim().slice(0, 100) : "",
        String(email).trim().slice(0, 255),
        phone ? String(phone).trim().slice(0, 50) : "",
        subject ? String(subject).trim().slice(0, 255) : "General Inquiry",
        String(message).trim(),
      ],
    );

    res.json({
      success: true,
      id: result.insertId,
      message: "Inquiry submitted successfully",
    });
  } catch (err) {
    console.error("[Contacts API Error]", err);
    res.status(500).json({ success: false, error: "Failed to submit inquiry." });
  }
});

app.delete("/api/contacts/:id", requireAuth, async (req, res) => {
  try {
    const result = await run("DELETE FROM contacts WHERE id = ?", [req.params.id]);
    res.json({ success: true, deleted: result.affectedRows });
  } catch (err) {
    console.error("[Contacts API Error]", err);
    res.status(500).json({ success: false, error: "Failed to delete contact." });
  }
});

// -------------------------------------------------------------------
// 4. SUBSCRIPTIONS API (TC-16)
// -------------------------------------------------------------------
app.get("/api/subscriptions", requireAuth, async (req, res) => {
  try {
    const { isPaginated, page, limit, offset } = getPaginationParams(req);
    const totalRow = await get("SELECT COUNT(*) as count FROM subscriptions");
    const total = Number(totalRow?.count) || 0;

    const querySql = isPaginated
      ? "SELECT * FROM subscriptions ORDER BY created_at DESC LIMIT ? OFFSET ?"
      : "SELECT * FROM subscriptions ORDER BY created_at DESC";

    const subs = isPaginated ? await query(querySql, [limit, offset]) : await query(querySql);

    if (isPaginated) {
      return res.json({
        success: true,
        data: subs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      });
    }
    res.json({ success: true, data: subs });
  } catch (err) {
    console.error("[Subscriptions API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch subscriptions." });
  }
});

app.post("/api/subscriptions", formLimiter, async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim()) || String(email).length > 255) {
      return res.status(400).json({ success: false, error: "Invalid email address format." });
    }

    const result = await run(
      "INSERT IGNORE INTO subscriptions (email, created_at) VALUES (?, NOW())",
      [String(email).trim().slice(0, 255)],
    );
    res.json({ success: true, id: result.insertId, message: "Subscribed successfully" });
  } catch (err) {
    console.error("[Subscriptions API Error]", err);
    res.status(500).json({ success: false, error: "Failed to subscribe." });
  }
});

app.delete("/api/subscriptions/:id", requireAuth, async (req, res) => {
  try {
    const result = await run("DELETE FROM subscriptions WHERE id = ?", [req.params.id]);
    res.json({ success: true, deleted: result.affectedRows });
  } catch (err) {
    console.error("[Subscriptions API Error]", err);
    res.status(500).json({ success: false, error: "Failed to delete subscription." });
  }
});

// -------------------------------------------------------------------
// 5. SETTINGS API
// -------------------------------------------------------------------
const PUBLIC_SETTING_KEYS = new Set([
  "batch_banner_title",
  "batch_banner_subtitle",
  "batch_banner_button_text",
  "contact_phone",
  "contact_secondary_phone",
  "contact_email",
  "admissions_email",
  "whatsapp_number",
  "office_address",
  "google_maps_url",
  "office_hours",
  "social_facebook",
  "social_instagram",
  "social_linkedin",
  "social_tiktok",
  "seo_meta_title",
  "seo_meta_description",
  "seo_meta_keywords",
  "seo_og_image",
  "google_analytics_id",
  "gtm_container_id",
  "meta_pixel_id",
]);

app.get("/api/settings", async (req, res) => {
  try {
    const rows = await query("SELECT * FROM settings");
    const settings = {};
    for (const r of rows) {
      if (PUBLIC_SETTING_KEYS.has(r.key)) {
        settings[r.key] = r.value;
      }
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    console.error("[Settings API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch settings." });
  }
});

app.get("/api/settings/all", requireAuth, async (req, res) => {
  try {
    const rows = await query("SELECT * FROM settings");
    const settings = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    console.error("[Settings API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch settings." });
  }
});

app.post("/api/settings", requireAuth, async (req, res) => {
  try {
    const settings = req.body || {};
    for (const [key, value] of Object.entries(settings)) {
      if (String(key).length <= 100) {
        await run(
          "INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)",
          [String(key), String(value)],
        );
      }
    }
    res.json({ success: true, message: "Settings updated successfully in MySQL" });
  } catch (err) {
    console.error("[Settings API Error]", err);
    res.status(500).json({ success: false, error: "Failed to update settings." });
  }
});

// -------------------------------------------------------------------
// 6. AI COURSE LEADS & PAYMENT VERIFICATIONS API (TC-06 Mass Assignment Defense)
// -------------------------------------------------------------------
const B32_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

function fnv32(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function checksumForServer(salt, body) {
  let h = fnv32(salt + "|" + body);
  let o = "";
  for (let i = 0; i < 4; i++) {
    o += B32_ALPHABET[h % 32];
    h = Math.floor(h / 32);
  }
  return o;
}

function validateAccessCodeServer(rawCode, salt) {
  const c = String(rawCode || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  const m = c.match(/^RDT([A-Z0-9]{5})([A-Z0-9]{4})$/);
  if (!m) return false;
  return checksumForServer(salt, m[1]) === m[2];
}

// Access code validation endpoint (public rate-limited)
app.post("/api/ai-access/verify-code", formLimiter, async (req, res) => {
  try {
    const { track, code } = req.body || {};
    const cleanCode = String(code || "")
      .trim()
      .toUpperCase();
    const cleanTrack = String(track || "")
      .trim()
      .toLowerCase();

    if (!cleanCode || !cleanTrack) {
      return res
        .status(400)
        .json({ success: false, valid: false, error: "Track and access code are required." });
    }

    const salt =
      cleanTrack === "healthcare"
        ? "RDT-AIHP-2026"
        : cleanTrack === "finance-advanced"
          ? "RDT-AIFA-2026"
          : cleanTrack === "finance"
            ? "RDT-AIFP-2026"
            : "";
    if (!salt || !validateAccessCodeServer(cleanCode, salt)) {
      return res.status(400).json({
        success: false,
        valid: false,
        error: "Invalid access code format or checksum mismatch.",
      });
    }

    // Verify against MySQL database: Must be an active verified enrolment/lead
    const lead = await get(
      "SELECT id, name, email, org, track, status, access_code AS accessCode FROM ai_leads WHERE UPPER(TRIM(access_code)) = ? AND track = ? AND status = 'verified' LIMIT 1",
      [cleanCode, cleanTrack],
    );

    if (!lead) {
      return res.status(403).json({
        success: false,
        valid: false,
        error:
          "This access code is invalid, revoked, or no active verified enrolment was found in the system.",
      });
    }

    res.json({
      success: true,
      valid: true,
      lead: {
        id: lead.id,
        name: lead.name,
        email: maskEmail(lead.email),
        org: lead.org,
        track: lead.track,
      },
    });
  } catch (err) {
    console.error("[AI Access Verify Code Error]", err);
    res
      .status(500)
      .json({ success: false, valid: false, error: "Server error during code verification." });
  }
});

// Live course access check endpoint (public rate-limited)
app.get("/api/ai-access/check-status", formLimiter, async (req, res) => {
  try {
    const cleanCode = String(req.query.code || "")
      .trim()
      .toUpperCase();
    const cleanTrack = String(req.query.track || "")
      .trim()
      .toLowerCase();

    if (!cleanCode || !cleanTrack) {
      return res.json({
        success: true,
        active: false,
        message: "Missing code or track parameter.",
      });
    }

    const salt =
      cleanTrack === "healthcare"
        ? "RDT-AIHP-2026"
        : cleanTrack === "finance-advanced"
          ? "RDT-AIFA-2026"
          : cleanTrack === "finance"
            ? "RDT-AIFP-2026"
            : "";
    if (!salt || !validateAccessCodeServer(cleanCode, salt)) {
      return res.json({ success: true, active: false, message: "Invalid code format." });
    }

    // Check if lead/access code still exists in MySQL with verified status
    const lead = await get(
      "SELECT id, name, email, org, track, status FROM ai_leads WHERE UPPER(TRIM(access_code)) = ? AND track = ? AND status = 'verified' LIMIT 1",
      [cleanCode, cleanTrack],
    );

    if (!lead) {
      return res.json({
        success: true,
        active: false,
        message: "Access code revoked or not found in database.",
      });
    }

    res.json({
      success: true,
      active: true,
      lead: {
        id: lead.id,
        name: lead.name,
        email: maskEmail(lead.email),
        org: lead.org,
        track: lead.track,
      },
    });
  } catch (err) {
    console.error("[AI Access Check Status Error]", err);
    res
      .status(500)
      .json({ success: false, active: false, error: "Server error checking access status." });
  }
});

// -------------------------------------------------------------------
// 6.1 PROTECTED SERVER-SIDE AI COURSE CONTENT GATING (TC-06 / DRM)
// -------------------------------------------------------------------
const coursesDataPath = path.resolve(__dirname, "./data/ai-courses/courses.json");
let aiCoursesData = null;
function getAiCoursesData() {
  if (!aiCoursesData && fs.existsSync(coursesDataPath)) {
    try {
      aiCoursesData = JSON.parse(fs.readFileSync(coursesDataPath, "utf8"));
    } catch (e) {
      console.error("[Course Data Load Error]", e);
    }
  }
  return aiCoursesData || {};
}

const FREE_PREVIEW_MAP = {
  foundations: ["l1", "l2", "l3", "l4", "l5"],
  healthcare: ["h1"],
  finance: ["m1"],
  "finance-advanced": ["a1"],
};

// Check if requester is authorized for a paid track
async function checkTrackEntitlement(req, track, code) {
  // 1. Admin session token bypass
  const token = extractToken(req);
  if (token) {
    const admin = await getUserForToken(token);
    if (admin) return { authorized: true, isAdmin: true };
  }

  // 2. Verified Access Code in MySQL ai_leads
  const cleanCode = String(code || "")
    .trim()
    .toUpperCase();
  const cleanTrack = String(track || "")
    .trim()
    .toLowerCase();
  if (!cleanCode)
    return { authorized: false, reason: "No access code provided for locked module." };

  const lead = await get(
    "SELECT id, name, email, org, track, status FROM ai_leads WHERE UPPER(TRIM(access_code)) = ? AND track = ? AND status = 'verified' LIMIT 1",
    [cleanCode, cleanTrack],
  );

  if (lead) {
    return { authorized: true, lead };
  }

  return { authorized: false, reason: "Invalid, revoked, or unverified access code." };
}

// Public / Gated Single Lesson API Endpoint
app.get("/api/ai-courses/lesson", formLimiter, async (req, res) => {
  try {
    const track = String(req.query.track || "")
      .trim()
      .toLowerCase();
    const lessonId = String(req.query.lessonId || "").trim();
    const code = String(req.query.code || "").trim();

    if (!track || !lessonId) {
      return res.status(400).json({ success: false, error: "Track and lessonId are required." });
    }

    const allCourses = getAiCoursesData();
    const trackLessons = allCourses[track];
    if (!trackLessons || !Array.isArray(trackLessons)) {
      return res.status(404).json({ success: false, error: `Track '${track}' not found.` });
    }

    const lesson = trackLessons.find((l) => l.id === lessonId);
    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, error: `Lesson '${lessonId}' not found in track '${track}'.` });
    }

    // Free Track (Foundations) or Free Preview Module (e.g. h1, m1, a1)
    const isFree =
      track === "foundations" ||
      (FREE_PREVIEW_MAP[track] && FREE_PREVIEW_MAP[track].includes(lessonId));
    if (isFree) {
      return res.json({ success: true, isFree: true, data: lesson });
    }

    // Paid Locked Lesson: Verify database entitlement
    const authResult = await checkTrackEntitlement(req, track, code);
    if (!authResult.authorized) {
      return res.status(403).json({
        success: false,
        locked: true,
        error: authResult.reason || "Access denied. Valid verified enrollment required.",
        manifest: {
          id: lesson.id,
          tag: lesson.tag,
          time: lesson.time,
          title: lesson.title,
          summary: lesson.summary,
          objectives: lesson.objectives || [],
        },
      });
    }

    // Authorized (Admin or Verified Paid Student)
    res.json({
      success: true,
      verified: true,
      data: lesson,
    });
  } catch (err) {
    console.error("[AI Course Lesson API Error]", err);
    res.status(500).json({ success: false, error: "Server error delivering lesson." });
  }
});

// Full Track Content API Endpoint (Returns full lessons if unlocked, or outlines if locked)
app.get("/api/ai-courses/track", formLimiter, async (req, res) => {
  try {
    const track = String(req.query.track || "")
      .trim()
      .toLowerCase();
    const code = String(req.query.code || "").trim();

    if (!track) {
      return res.status(400).json({ success: false, error: "Track parameter is required." });
    }

    const allCourses = getAiCoursesData();
    const trackLessons = allCourses[track];
    if (!trackLessons || !Array.isArray(trackLessons)) {
      return res.status(404).json({ success: false, error: `Track '${track}' not found.` });
    }

    if (track === "foundations") {
      return res.json({ success: true, unlocked: true, data: trackLessons });
    }

    const authResult = await checkTrackEntitlement(req, track, code);
    const freePreviews = FREE_PREVIEW_MAP[track] || [];

    if (authResult.authorized) {
      return res.json({
        success: true,
        unlocked: true,
        data: trackLessons,
      });
    }

    // Return sanitized curriculum outlines with zero proprietary content for locked lessons
    const sanitized = trackLessons.map((l) => {
      if (freePreviews.includes(l.id)) {
        return l;
      }
      return {
        id: l.id,
        tag: l.tag,
        time: l.time,
        title: l.title,
        summary: l.summary,
        objectives: l.objectives || [],
        sections: [],
        activity: { title: "", text: "" },
        takeaways: [],
        quiz: [],
      };
    });

    res.json({
      success: true,
      unlocked: false,
      data: sanitized,
    });
  } catch (err) {
    console.error("[AI Course Track API Error]", err);
    res.status(500).json({ success: false, error: "Server error delivering track." });
  }
});

app.get("/api/ai-leads", requireAuth, async (req, res) => {
  try {
    const { isPaginated, page, limit, offset } = getPaginationParams(req);
    const totalRow = await get("SELECT COUNT(*) as count FROM ai_leads");
    const total = Number(totalRow?.count) || 0;

    const querySql = isPaginated
      ? "SELECT id, name, email, org, track, txn, status, access_code AS accessCode, notes, email_sent AS emailSent, email_sent_at AS emailSentAt, receipt_url AS receiptUrl, created_at AS date FROM ai_leads ORDER BY created_at DESC LIMIT ? OFFSET ?"
      : "SELECT id, name, email, org, track, txn, status, access_code AS accessCode, notes, email_sent AS emailSent, email_sent_at AS emailSentAt, receipt_url AS receiptUrl, created_at AS date FROM ai_leads ORDER BY created_at DESC";

    const rows = isPaginated ? await query(querySql, [limit, offset]) : await query(querySql);

    const formatted = rows.map((r) => ({
      ...r,
      emailSent: Boolean(r.emailSent),
      date: r.date ? new Date(r.date).toISOString() : new Date().toISOString(),
      emailSentAt: r.emailSentAt ? new Date(r.emailSentAt).toISOString() : undefined,
    }));

    if (isPaginated) {
      return res.json({
        success: true,
        data: formatted,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      });
    }
    res.json({ success: true, data: formatted });
  } catch (err) {
    console.error("[AI Leads API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch leads." });
  }
});

// Public Lead creation (Enforces safe unprivileged defaults - TC-06)
app.post("/api/ai-leads", formLimiter, async (req, res) => {
  try {
    const { name, email, org, track, txn, receipt_url, receiptUrl } = req.body || {};

    if (!name || !email || !track) {
      return res
        .status(400)
        .json({ success: false, error: "Name, email, and track are required." });
    }

    if (
      String(name).length > 255 ||
      String(email).length > 255 ||
      (org && String(org).length > 255)
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Field lengths exceed maximum allowed limit." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({ success: false, error: "Invalid email address format." });
    }

    const finalReceiptUrl = receipt_url || receiptUrl || null;
    const leadId = `lead-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

    // Security: Ignore client-supplied status, accessCode, emailSent, notes (TC-06)
    await run(
      `INSERT INTO ai_leads (id, name, email, org, track, txn, status, access_code, notes, email_sent, email_sent_at, receipt_url)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', NULL, NULL, 0, NULL, ?)`,
      [
        leadId,
        String(name).trim().slice(0, 255),
        String(email).trim().slice(0, 255),
        org ? String(org).trim().slice(0, 255) : null,
        String(track).trim().slice(0, 50),
        txn ? String(txn).trim().slice(0, 100) : null,
        finalReceiptUrl ? String(finalReceiptUrl).slice(0, 500) : null,
      ],
    );

    res.json({
      success: true,
      data: {
        id: leadId,
        name: String(name).trim(),
        email: String(email).trim(),
        org: org ? String(org).trim() : null,
        track,
        txn: txn ? String(txn).trim() : null,
        receiptUrl: finalReceiptUrl,
        status: "pending",
        accessCode: null,
        date: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("[AI Leads API Error]", err);
    res.status(500).json({ success: false, error: "Failed to create lead." });
  }
});

app.put("/api/ai-leads/:id", requireAuth, async (req, res) => {
  try {
    const {
      status,
      accessCode,
      access_code,
      notes,
      emailSent,
      emailSentAt,
      receiptUrl,
      receipt_url,
    } = req.body || {};
    const updates = [];
    const params = [];

    if (status !== undefined) {
      updates.push("status = ?");
      params.push(String(status).slice(0, 50));
    }
    const resolvedCode = accessCode !== undefined ? accessCode : access_code;
    if (resolvedCode !== undefined) {
      updates.push("access_code = ?");
      params.push(resolvedCode ? String(resolvedCode).trim().toUpperCase().slice(0, 100) : null);
    }
    if (notes !== undefined) {
      updates.push("notes = ?");
      params.push(notes ? String(notes) : null);
    }
    if (emailSent !== undefined) {
      updates.push("email_sent = ?");
      params.push(emailSent ? 1 : 0);
    }
    if (emailSentAt !== undefined) {
      updates.push("email_sent_at = ?");
      params.push(emailSentAt ? new Date(emailSentAt) : null);
    }
    if (receiptUrl !== undefined || receipt_url !== undefined) {
      updates.push("receipt_url = ?");
      params.push(
        receiptUrl || receipt_url ? String(receiptUrl || receipt_url).slice(0, 500) : null,
      );
    }

    if (updates.length === 0) {
      return res.json({ success: true, message: "No fields to update." });
    }

    params.push(req.params.id);
    await run(`UPDATE ai_leads SET ${updates.join(", ")} WHERE id = ?`, params);

    res.json({ success: true, message: "AI lead updated successfully in MySQL." });
  } catch (err) {
    console.error("[AI Leads API Error]", err);
    res.status(500).json({ success: false, error: "Failed to update lead." });
  }
});

app.delete("/api/ai-leads/:id", requireAuth, async (req, res) => {
  try {
    const result = await run("DELETE FROM ai_leads WHERE id = ?", [req.params.id]);
    res.json({ success: true, deleted: result.affectedRows });
  } catch (err) {
    console.error("[AI Leads API Error]", err);
    res.status(500).json({ success: false, error: "Failed to delete lead." });
  }
});

// -------------------------------------------------------------------
// 7. DASHBOARD STATS OVERVIEW API
// -------------------------------------------------------------------
app.get("/api/stats", requireAuth, async (req, res) => {
  try {
    const contactsRow = await get("SELECT COUNT(*) as count FROM contacts");
    const subscriptionsRow = await get("SELECT COUNT(*) as count FROM subscriptions");
    const certificatesRow = await get("SELECT COUNT(*) as count FROM certificates");
    const coursesRow = await get(
      "SELECT COUNT(*) as count FROM courses WHERE status = 'published'",
    );

    res.json({
      success: true,
      data: {
        contactsCount: Number(contactsRow?.count) || 0,
        subscriptionsCount: Number(subscriptionsRow?.count) || 0,
        certificatesCount: Number(certificatesRow?.count) || 0,
        coursesCount: Number(coursesRow?.count) || 0,
      },
    });
  } catch (err) {
    console.error("[Stats API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch dashboard stats." });
  }
});

// -------------------------------------------------------------------
// 8. ADMIN SYSTEM DIAGNOSTICS & DATABASE BACKUP API
// -------------------------------------------------------------------
app.get("/api/admin/system-info", requireAuth, async (req, res) => {
  try {
    const mem = process.memoryUsage();
    const coursesCount = await get("SELECT COUNT(*) as count FROM courses");
    const certsCount = await get("SELECT COUNT(*) as count FROM certificates");
    const contactsCount = await get("SELECT COUNT(*) as count FROM contacts");
    const subsCount = await get("SELECT COUNT(*) as count FROM subscriptions");
    const leadsCount = await get("SELECT COUNT(*) as count FROM ai_leads");
    const settingsCount = await get("SELECT COUNT(*) as count FROM settings");

    let uploadsCount = 0;
    let uploadsSizeBytes = 0;
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      uploadsCount = files.length;
      for (const f of files) {
        try {
          const st = fs.statSync(path.join(uploadsDir, f));
          uploadsSizeBytes += st.size;
        } catch {}
      }
    }

    res.json({
      success: true,
      data: {
        nodeVersion: process.version,
        platform: process.platform,
        uptimeSeconds: Math.floor(process.uptime()),
        memoryRssMb: Math.round((mem.rss / 1024 / 1024) * 10) / 10,
        memoryHeapMb: Math.round((mem.heapUsed / 1024 / 1024) * 10) / 10,
        database: {
          type: "MySQL",
          databaseName: dbConfig.database,
          host: dbConfig.host,
          port: dbConfig.port,
          status: "connected",
          tables: {
            courses: Number(coursesCount?.count) || 0,
            certificates: Number(certsCount?.count) || 0,
            contacts: Number(contactsCount?.count) || 0,
            subscriptions: Number(subsCount?.count) || 0,
            ai_leads: Number(leadsCount?.count) || 0,
            settings: Number(settingsCount?.count) || 0,
          },
        },
        uploads: {
          fileCount: uploadsCount,
          sizeMb: Math.round((uploadsSizeBytes / 1024 / 1024) * 10) / 10,
        },
      },
    });
  } catch (err) {
    console.error("[System Info API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch system diagnostics." });
  }
});

app.get("/api/admin/export-db", requireAuth, async (req, res) => {
  try {
    const courses = await query("SELECT * FROM courses ORDER BY created_at DESC");
    const certificates = await query("SELECT * FROM certificates ORDER BY created_at DESC");
    const contacts = await query("SELECT * FROM contacts ORDER BY created_at DESC");
    const subscriptions = await query("SELECT * FROM subscriptions ORDER BY created_at DESC");
    const ai_leads = await query("SELECT * FROM ai_leads ORDER BY created_at DESC");
    const settings = await query("SELECT * FROM settings");

    const exportData = {
      meta: {
        exportedAt: new Date().toISOString(),
        exportedBy: req.admin?.email || "admin",
        application: "Red Dot Technologies Management System",
        databaseType: "MySQL",
      },
      counts: {
        courses: courses.length,
        certificates: certificates.length,
        contacts: contacts.length,
        subscriptions: subscriptions.length,
        ai_leads: ai_leads.length,
        settings: settings.length,
      },
      data: {
        courses,
        certificates,
        contacts,
        subscriptions,
        ai_leads,
        settings,
      },
    };

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="reddot-db-backup-${new Date().toISOString().slice(0, 10)}.json"`,
    );
    res.send(JSON.stringify(exportData, null, 2));
  } catch (err) {
    console.error("[Database Export Error]", err);
    res.status(500).json({ success: false, error: "Failed to generate database export." });
  }
});

// JSON Catch-All 404 Handler for all unmatched /api/* routes (TC-19)
app.all("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `API endpoint ${req.method} ${req.path} not found.`,
  });
});

// Export app for production SSR entry (server/prod-entry.js)
export { app };

// Listen when executed directly (`node server/server.js`)
const isDirectRun =
  process.argv[1] != null && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`🚀 Red Dot MySQL Backend Server running on http://localhost:${PORT}`);
  });
}
