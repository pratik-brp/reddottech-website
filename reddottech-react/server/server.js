import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { db } from "./db.js";
import { requireAuth, authHandlers } from "./auth.js";
import { seedDatabase } from "./seed.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Restrict CORS to known origins (dev defaults). Requests without an Origin
// header (e.g. curl / same-origin server-to-server) are always allowed.
const allowedOrigins = new Set(
  (
    process.env.CORS_ORIGINS ||
    "http://localhost:3000,http://localhost:5173,http://localhost:4173,http://127.0.0.1:3000,http://127.0.0.1:5173"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({ success: false, error: "Origin not allowed by CORS policy." });
  }
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

// Idempotent seed on boot (default settings + first admin account).
seedDatabase();

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Red Dot SQLite Backend Server is active" });
});

// -------------------------------------------------------------------
// AUTH API
// -------------------------------------------------------------------
app.post("/api/auth/login", authHandlers.login);
app.post("/api/auth/logout", authHandlers.logout);
app.get("/api/auth/me", authHandlers.me);
app.post("/api/auth/change-password", authHandlers.changePassword);

// -------------------------------------------------------------------
// 1. COURSES API
// -------------------------------------------------------------------
app.get("/api/courses", (req, res) => {
  try {
    const courses = db.prepare("SELECT * FROM courses ORDER BY created_at DESC").all();
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
      price: c.price,
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
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/courses/:id", (req, res) => {
  try {
    const course = db
      .prepare("SELECT * FROM courses WHERE id = ? OR slug = ?")
      .get(req.params.id, req.params.id);

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
      price: course.price,
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
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/courses", requireAuth, (req, res) => {
  try {
    const body = req.body;
    const id = Date.now().toString();
    const slug = (body.name || "course").toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const stmt = db.prepare(`
      INSERT INTO courses (
        id, name, slug, description, long_description, thumbnail, banner_image,
        instructor_name, instructor_title, instructor_image, instructor_detail,
        duration, start_date, price, delivery, mode, language, skill_level,
        category, certification, requirements, curriculum, status
      ) VALUES (
        @id, @name, @slug, @description, @long_description, @thumbnail, @banner_image,
        @instructor_name, @instructor_title, @instructor_image, @instructor_detail,
        @duration, @start_date, @price, @delivery, @mode, @language, @skill_level,
        @category, @certification, @requirements, @curriculum, @status
      )
    `);

    stmt.run({
      id,
      name: body.name || "New Course",
      slug,
      description: body.description || "",
      long_description: body.longDescription || body.description || "",
      thumbnail: body.thumbnail || "/images/courses/course-ai.jpg",
      banner_image: body.bannerImage || "/images/courses/banner-ai.jpg",
      instructor_name: body.instructorName || "Instructor",
      instructor_title: body.instructorTitle || "Faculty Lead",
      instructor_image: body.instructorImage || "/images/instructor/instructor1.png",
      instructor_detail: body.instructorDetail || "",
      duration: body.duration || "4 weeks",
      start_date: body.startDate || "Rolling Admission",
      price: Number(body.price) || 0,
      delivery: body.delivery || "online",
      mode: body.mode || "Self-Paced",
      language: body.language || "English",
      skill_level: body.skillLevel || "beginner",
      category: body.category || "General",
      certification: body.certification || "Red Dot Certified",
      requirements: body.requirements || "",
      curriculum: body.curriculum || "",
      status: body.status || "published",
    });

    res.json({ success: true, message: "Course created successfully", id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/api/courses/:id", requireAuth, (req, res) => {
  try {
    const body = req.body;
    const stmt = db.prepare(`
      UPDATE courses SET
        name = @name,
        description = @description,
        long_description = @long_description,
        instructor_name = @instructor_name,
        instructor_title = @instructor_title,
        instructor_detail = @instructor_detail,
        duration = @duration,
        start_date = @start_date,
        price = @price,
        delivery = @delivery,
        mode = @mode,
        language = @language,
        skill_level = @skill_level,
        certification = @certification,
        status = @status,
        curriculum = @curriculum,
        requirements = @requirements
      WHERE id = @id
    `);

    stmt.run({
      id: req.params.id,
      name: body.name || "Course",
      description: body.description || "",
      long_description: body.longDescription || body.description || "",
      instructor_name: body.instructorName || "Instructor",
      instructor_title: body.instructorTitle || "Faculty Lead",
      instructor_detail: body.instructorDetail || "",
      duration: body.duration || "4 weeks",
      start_date: body.startDate || "Rolling Admission",
      price: Number(body.price) || 0,
      delivery: body.delivery || "online",
      mode: body.mode || "Self-Paced",
      language: body.language || "English",
      skill_level: body.skillLevel || "beginner",
      certification: body.certification || "PECP Certified",
      status: body.status || "published",
      curriculum: body.curriculum || "",
      requirements: body.requirements || "",
    });

    res.json({ success: true, message: "Course updated successfully in SQLite" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/courses/:id", requireAuth, (req, res) => {
  try {
    const result = db.prepare("DELETE FROM courses WHERE id = ?").run(req.params.id);
    res.json({ success: true, deleted: result.changes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------------
// 2. CERTIFICATES API
// -------------------------------------------------------------------
app.get("/api/certificates", requireAuth, (req, res) => {
  try {
    const certs = db.prepare("SELECT * FROM certificates ORDER BY created_at DESC").all();
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/certificates/claim", (req, res) => {
  try {
    const { name, email, school } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: "Name and Email are required" });
    }

    const completed_at = new Date().toISOString().split("T")[0];
    const stmt = db.prepare(`
      INSERT INTO certificates (name, email, school, completed_at)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, school || "Not provided", completed_at);
    res.json({ success: true, id: result.lastInsertRowid, name, email, school, completed_at });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/certificates/:id", requireAuth, (req, res) => {
  try {
    const result = db.prepare("DELETE FROM certificates WHERE id = ?").run(req.params.id);
    res.json({ success: true, deleted: result.changes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------------
// 3. CONTACTS API
// -------------------------------------------------------------------
app.get("/api/contacts", requireAuth, (req, res) => {
  try {
    const contacts = db.prepare("SELECT * FROM contacts ORDER BY created_at DESC").all();
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/contacts", (req, res) => {
  try {
    const { first_name, last_name, email, phone, subject, message } = req.body;
    if (!first_name || !email || !message) {
      return res.status(400).json({ success: false, error: "Missing required contact fields" });
    }

    const stmt = db.prepare(`
      INSERT INTO contacts (first_name, last_name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      first_name,
      last_name || "",
      email,
      phone || "",
      subject || "General Inquiry",
      message,
    );
    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: "Inquiry submitted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/contacts/:id", requireAuth, (req, res) => {
  try {
    const result = db.prepare("DELETE FROM contacts WHERE id = ?").run(req.params.id);
    res.json({ success: true, deleted: result.changes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------------
// 4. SUBSCRIPTIONS API
// -------------------------------------------------------------------
app.get("/api/subscriptions", requireAuth, (req, res) => {
  try {
    const subs = db.prepare("SELECT * FROM subscriptions ORDER BY created_at DESC").all();
    res.json({ success: true, data: subs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/subscriptions", (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const stmt = db.prepare("INSERT OR IGNORE INTO subscriptions (email) VALUES (?)");
    const result = stmt.run(email);
    res.json({ success: true, id: result.lastInsertRowid, message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/subscriptions/:id", requireAuth, (req, res) => {
  try {
    const result = db.prepare("DELETE FROM subscriptions WHERE id = ?").run(req.params.id);
    res.json({ success: true, deleted: result.changes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------------
// 5. SETTINGS API
// -------------------------------------------------------------------
app.get("/api/settings", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM settings").all();
    const settings = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/settings", requireAuth, (req, res) => {
  try {
    const settings = req.body;
    const stmt = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");

    for (const [key, value] of Object.entries(settings)) {
      stmt.run(key, String(value));
    }

    res.json({ success: true, message: "Settings updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------------
// 6. DASHBOARD STATS OVERVIEW API
// -------------------------------------------------------------------
app.get("/api/stats", requireAuth, (req, res) => {
  try {
    const contactsCount = db.prepare("SELECT COUNT(*) as count FROM contacts").get().count;
    const subscriptionsCount = db
      .prepare("SELECT COUNT(*) as count FROM subscriptions")
      .get().count;
    const certificatesCount = db.prepare("SELECT COUNT(*) as count FROM certificates").get().count;
    const coursesCount = db
      .prepare("SELECT COUNT(*) as count FROM courses WHERE status = 'published'")
      .get().count;

    res.json({
      success: true,
      data: {
        contactsCount,
        subscriptionsCount,
        certificatesCount,
        coursesCount,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Export the app so the production entry (server/prod-entry.js) can compose
// Express + the SSR handler into a single HTTP server.
export { app };

// Only start listening when run directly (`node server/server.js`).
const isDirectRun =
  process.argv[1] != null && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`🚀 Red Dot SQLite Backend Server running on http://localhost:${PORT}`);
  });
}
