import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import express from "express";
import { initDb, query, get, run, dbConfig } from "./db.js";
import { requireAuth, authHandlers } from "./auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Restrict CORS to known origins
const allowedOrigins = new Set(
  (
    process.env.CORS_ORIGINS ||
    "http://localhost:3000,http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:4173,http://127.0.0.1:3000,http://127.0.0.1:5173,http://127.0.0.1:5175"
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
  next();
});

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use("/uploads", express.static(uploadsDir));

// Rate limiter for public endpoints (in-memory sliding window)
const rateLimitMap = new Map();
function createRateLimiter({ windowMs = 60 * 1000, max = 20, message = "Too many requests. Please try again later." } = {}) {
  return (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
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

const formLimiter = createRateLimiter({ windowMs: 60 * 1000, max: 15, message: "Too many submissions. Please wait a moment." });
const authLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 15, message: "Too many login attempts. Please try again in 15 minutes." });

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

// Image Upload Endpoint
app.post("/api/upload", formLimiter, requireAuth, (req, res) => {
  try {
    const { filename, base64Data } = req.body || {};
    if (!base64Data || typeof base64Data !== "string") {
      return res.status(400).json({ success: false, error: "No image data provided." });
    }

    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, error: "Invalid image format. Expected data URI (e.g. data:image/jpeg;base64,...)" });
    }

    const mime = matches[1].toLowerCase();
    let ext = ".jpg";
    if (mime === "image/jpeg" || mime === "image/jpg") ext = ".jpg";
    else if (mime === "image/webp") ext = ".webp";
    else if (mime === "image/png") ext = ".png";
    else {
      return res.status(400).json({ success: false, error: "Only JPG, PNG, and WebP images are allowed." });
    }
    const buffer = Buffer.from(matches[2], "base64");

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

// Payment Receipt Screenshot Upload Endpoint (Public Rate-Limited)
app.post("/api/upload-receipt", formLimiter, (req, res) => {
  try {
    const { filename, base64Data } = req.body || {};
    if (!base64Data || typeof base64Data !== "string") {
      return res.status(400).json({ success: false, error: "No receipt image data provided." });
    }

    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
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
        error: "Only JPG, PNG, and WebP payment receipts or screenshots are allowed.",
      });
    }
    const buffer = Buffer.from(matches[2], "base64");

    const cleanName = (filename || "receipt")
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "_");
    const uniqueName = `receipt_${cleanName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${uniqueName}`;
    res.json({ success: true, url: publicUrl, filename: uniqueName });
  } catch (err) {
    console.error("[Receipt Upload Error]", err);
    res.status(500).json({ success: false, error: "Failed to upload payment receipt." });
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

// -------------------------------------------------------------------
// 1. COURSES API
// -------------------------------------------------------------------
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await query("SELECT * FROM courses ORDER BY created_at DESC");
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
    res.json({ success: true, data: formatted });
  } catch (err) {
    console.error("[Courses API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch courses." });
  }
});

app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await get(
      "SELECT * FROM courses WHERE id = ? OR slug = ?",
      [req.params.id, req.params.id]
    );

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
    const id = body.id || `course-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const slug = (body.name || "course").toLowerCase().replace(/[^a-z0-9]+/g, "-");

    await run(
      `INSERT INTO courses (
        id, name, slug, description, long_description, thumbnail, banner_image,
        instructor_name, instructor_title, instructor_image, instructor_detail,
        duration, start_date, price, delivery, mode, language, skill_level,
        category, certification, requirements, curriculum, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        id,
        body.name || "New Course",
        slug,
        body.description || "",
        body.longDescription || body.description || "",
        body.thumbnail || "/images/courses/ai.jpg",
        body.bannerImage || "/images/courses/courses_hero_banner.jpg",
        body.instructorName || "Instructor",
        body.instructorTitle || "Faculty Lead",
        body.instructorImage || "/images/instructor/instructor1.png",
        body.instructorDetail || "",
        body.duration || "4 weeks",
        body.startDate || "Rolling Admission",
        Number(body.price) || 0,
        body.delivery || "online",
        body.mode || "Instructor-led",
        body.language || "English",
        body.skillLevel || "beginner",
        body.category || "General",
        body.certification || "Red Dot Certified",
        body.requirements || "",
        body.curriculum || "",
        body.status || "published"
      ]
    );

    res.json({ success: true, message: "Course created successfully in MySQL", id });
  } catch (err) {
    console.error("[Courses API Error]", err);
    res.status(500).json({ success: false, error: "Failed to create course." });
  }
});

app.put("/api/courses/:id", requireAuth, async (req, res) => {
  try {
    const body = req.body || {};
    await run(
      `UPDATE courses SET
        name = ?,
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
        body.name || "Course",
        body.category || "Professional Certification",
        body.description || "",
        body.longDescription || body.description || "",
        body.thumbnail || "/images/courses/ai.jpg",
        body.bannerImage || "/images/courses/courses_hero_banner.jpg",
        body.instructorName || body.instructor_name || "Instructor",
        body.instructorTitle || body.instructor_title || "Faculty Lead",
        body.instructorImage || body.instructor_image || "/images/instructor/instructor1.png",
        body.instructorDetail || body.instructor_detail || "",
        body.duration || "4 weeks",
        body.startDate || body.start_date || "Rolling Admission",
        Number(body.price) || 0,
        body.delivery || "online",
        body.mode || "Instructor-led",
        body.language || "English",
        body.skillLevel || body.skill_level || "beginner",
        body.certification || "PECP Certified",
        body.status || "published",
        body.curriculum || "",
        body.requirements || "",
        req.params.id
      ]
    );

    res.json({ success: true, message: "Course updated successfully in MySQL" });
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
// 2. CERTIFICATES API
// -------------------------------------------------------------------
app.get("/api/certificates", requireAuth, async (req, res) => {
  try {
    const certs = await query("SELECT * FROM certificates ORDER BY created_at DESC");
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
      return res.status(400).json({ success: false, error: "Name and Email are required" });
    }

    const completed_at = new Date().toISOString().split("T")[0];
    const resolvedTrack = track || "foundations";
    const resolvedCourseName =
      course_name ||
      (resolvedTrack === "healthcare"
        ? "AI for Healthcare Professionals"
        : resolvedTrack === "finance"
        ? "AI for Financial Professionals"
        : resolvedTrack === "pecp"
        ? "Professional Executive Certificate"
        : "AI Foundations: General AI Literacy");

    const autoCertCode =
      certificate_id || `RDT-${resolvedTrack.toUpperCase()}-${Date.now().toString().slice(-6)}`;

    const result = await run(
      `INSERT INTO certificates (
        name, email, school, track, course_name, certificate_id, organization, role, department, completed_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        name,
        email,
        school || organization || "Red Dot Technologies",
        resolvedTrack,
        resolvedCourseName,
        autoCertCode,
        organization || school || null,
        role || null,
        department || null,
        completed_at,
      ]
    );

    res.json({
      success: true,
      id: result.insertId,
      name,
      email,
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

// Certificate Verification (Public Verification Endpoint)
app.get("/api/certificates/verify/:query", formLimiter, async (req, res) => {
  try {
    const rawQuery = String(req.params.query || "").trim();
    if (!rawQuery) {
      return res.status(400).json({ success: false, error: "Verification identifier is required." });
    }

    // Extract potential integer from end of query e.g. "RDT-FOUNDATIONS-2" -> 2 or "2" -> 2
    const numMatch = rawQuery.match(/(\d+)$/);
    const extractedNum = numMatch ? parseInt(numMatch[1], 10) : 0;

    const cert = await get(
      `SELECT id, name, email, school, completed_at, created_at, track, course_name, certificate_id, organization, role, department 
       FROM certificates 
       WHERE certificate_id = ? 
          OR certificate_id LIKE ? 
          OR id = ? 
          OR email = ? 
          OR email LIKE ? 
          OR name = ? 
          OR name LIKE ? 
       ORDER BY id DESC 
       LIMIT 1`,
      [rawQuery, `%${rawQuery}%`, extractedNum, rawQuery, `%${rawQuery}%`, rawQuery, `%${rawQuery}%`]
    );

    if (!cert) {
      return res.status(404).json({
        success: false,
        verified: false,
        error: "Certificate record not found in the official registry. Please verify the entered ID or name.",
      });
    }

    const trackLabel =
      cert.track === "healthcare"
        ? "AI for Healthcare Professionals"
        : cert.track === "finance"
        ? "AI for Financial & Banking Professionals"
        : cert.course_name || "AI Foundations: General AI Literacy";

    const certCode = cert.certificate_id || `RDT-${String(cert.track || "AI").toUpperCase()}-${cert.id}`;

    res.json({
      success: true,
      verified: true,
      data: {
        id: cert.id,
        name: cert.name,
        email: cert.email,
        school: cert.school,
        track: cert.track,
        courseName: cert.course_name || trackLabel,
        certificateId: certCode,
        organization: cert.organization,
        role: cert.role,
        department: cert.department,
        completedAt: cert.completed_at || cert.created_at,
        issuedAt: cert.created_at,
        issuer: "Red Dot Technologies in academic collaboration with University of South Carolina Upstate (USA)",
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
// 3. CONTACTS API
// -------------------------------------------------------------------
app.get("/api/contacts", requireAuth, async (req, res) => {
  try {
    const contacts = await query("SELECT * FROM contacts ORDER BY created_at DESC");
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

    const result = await run(
      "INSERT INTO contacts (first_name, last_name, email, phone, subject, message, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [first_name, last_name || "", email, phone || "", subject || "General Inquiry", message]
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
// 4. SUBSCRIPTIONS API
// -------------------------------------------------------------------
app.get("/api/subscriptions", requireAuth, async (req, res) => {
  try {
    const subs = await query("SELECT * FROM subscriptions ORDER BY created_at DESC");
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

    const result = await run(
      "INSERT IGNORE INTO subscriptions (email, created_at) VALUES (?, NOW())",
      [email]
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
      await run(
        "INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)",
        [key, String(value)]
      );
    }
    res.json({ success: true, message: "Settings updated successfully in MySQL" });
  } catch (err) {
    console.error("[Settings API Error]", err);
    res.status(500).json({ success: false, error: "Failed to update settings." });
  }
});

// -------------------------------------------------------------------
// 6. AI COURSE LEADS & PAYMENT VERIFICATIONS API
// -------------------------------------------------------------------
app.get("/api/ai-leads", requireAuth, async (req, res) => {
  try {
    const rows = await query(
      "SELECT id, name, email, org, track, txn, status, access_code AS accessCode, notes, email_sent AS emailSent, email_sent_at AS emailSentAt, receipt_url AS receiptUrl, created_at AS date FROM ai_leads ORDER BY created_at DESC"
    );
    res.json({
      success: true,
      data: rows.map((r) => ({
        ...r,
        emailSent: Boolean(r.emailSent),
        date: r.date ? new Date(r.date).toISOString() : new Date().toISOString(),
        emailSentAt: r.emailSentAt ? new Date(r.emailSentAt).toISOString() : undefined,
      })),
    });
  } catch (err) {
    console.error("[AI Leads API Error]", err);
    res.status(500).json({ success: false, error: "Failed to fetch leads." });
  }
});

app.post("/api/ai-leads", formLimiter, async (req, res) => {
  try {
    const { name, email, org, track, txn, receipt_url, receiptUrl } = req.body || {};

    if (!name || !email || !track) {
      return res.status(400).json({ success: false, error: "Name, email, and track are required." });
    }

    const finalReceiptUrl = receipt_url || receiptUrl || null;
    const leadId = `lead-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    await run(
      `INSERT INTO ai_leads (id, name, email, org, track, txn, status, access_code, notes, email_sent, email_sent_at, receipt_url)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', NULL, NULL, 0, NULL, ?)`,
      [
        leadId,
        String(name).trim(),
        String(email).trim(),
        org ? String(org).trim() : null,
        track,
        txn ? String(txn).trim() : null,
        finalReceiptUrl,
      ]
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
    const { status, accessCode, notes, emailSent, emailSentAt, receiptUrl, receipt_url } = req.body || {};
    const updates = [];
    const params = [];

    if (status !== undefined) {
      updates.push("status = ?");
      params.push(status);
    }
    if (accessCode !== undefined) {
      updates.push("access_code = ?");
      params.push(accessCode);
    }
    if (notes !== undefined) {
      updates.push("notes = ?");
      params.push(notes);
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
      params.push(receiptUrl || receipt_url || null);
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
    const coursesRow = await get("SELECT COUNT(*) as count FROM courses WHERE status = 'published'");

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
      `attachment; filename="reddot-db-backup-${new Date().toISOString().slice(0, 10)}.json"`
    );
    res.send(JSON.stringify(exportData, null, 2));
  } catch (err) {
    console.error("[Database Export Error]", err);
    res.status(500).json({ success: false, error: "Failed to generate database export." });
  }
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
