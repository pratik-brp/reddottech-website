import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "data", "database.sqlite");
const db = new Database(dbPath);

console.log("Inspecting database at:", dbPath);

// Create table if not exists with all comprehensive columns
db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    description TEXT,
    long_description TEXT,
    thumbnail TEXT,
    banner_image TEXT,
    instructor_name TEXT,
    instructor_title TEXT,
    instructor_image TEXT,
    instructor_detail TEXT,
    duration TEXT,
    start_date TEXT,
    price REAL,
    delivery TEXT,
    mode TEXT,
    language TEXT,
    skill_level TEXT,
    category TEXT,
    certification TEXT,
    requirements TEXT,
    curriculum TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Load all 5 courses from reddottech/all_courses.json or full data
const allCoursesJsonPath = path.resolve(__dirname, "../../reddottech/all_courses.json");
let rawCourses = [];

if (fs.existsSync(allCoursesJsonPath)) {
  rawCourses = JSON.parse(fs.readFileSync(allCoursesJsonPath, "utf-8"));
  console.log("Loaded", rawCourses.length, "courses from all_courses.json");
}

const categories = {
  1: "Quality & Management",
  2: "Leadership & Management",
  3: "Project Management",
  4: "Artificial Intelligence",
  5: "Analytics & Data",
};

const instructorTitles = {
  1: "Doctorate in Business Administration, CSSBB®, PMP®",
  2: "Ph.D. in Industrial / Organizational Psychology",
  3: "PMP®, CSSBB®, DBA",
  4: "AI Patent Holder & Tech Veteran (Ex-Microsoft)",
  5: "CFP®, Mini-MBA (Yale School of Management)",
};

const instructorImages = {
  1: "/images/instructor/instructor1.png",
  2: "/images/instructor/instructor2.png",
  3: "/images/instructor/instructor3.png",
  4: "/images/instructor/instructor1.png",
  5: "/images/instructor/instructor2.png",
};

const certifications = {
  1: "USC Upstate & Red Dot Certified Six Sigma Professional",
  2: "USC Upstate Certified Management Professional",
  3: "Red Dot & USC Upstate Project Management Practitioner",
  4: "USC Upstate & Red Dot AI Specialist",
  5: "USC Upstate Business Analytics Practitioner",
};

// Clear existing courses and reseed all 5 cleanly
const deleteStmt = db.prepare("DELETE FROM courses");
deleteStmt.run();

const insertStmt = db.prepare(`
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

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
};

for (const c of rawCourses) {
  const courseId = c.id.toString();
  const slug = c.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Create clean short and long descriptions
  const plainDesc = stripHtml(c.description);
  const shortDesc = plainDesc.length > 180 ? plainDesc.slice(0, 180).trim() + "..." : plainDesc;

  const thumbnail = c.thumbnail?.startsWith("/") ? c.thumbnail : `/storage/${c.thumbnail}`;
  const bannerImage = c.banner_image?.startsWith("/")
    ? c.banner_image
    : `/storage/${c.banner_image}`;

  const cleanReqs = (c.requirements || "")
    .replace(/<a\b[^>]*>(.*?)<\/a>/gi, "$1")
    .trim();

  const row = {
    id: courseId,
    name: c.name,
    slug: slug,
    description: shortDesc,
    long_description: c.description,
    thumbnail: thumbnail,
    banner_image: bannerImage,
    instructor_name: c.instructor_name || "Faculty Specialist",
    instructor_title: instructorTitles[c.id] || "Senior Faculty",
    instructor_image: instructorImages[c.id] || "/images/instructor/instructor1.png",
    instructor_detail: c.instructor_detail || "",
    duration: c.duration || "6 weeks",
    start_date: c.start_date || "Rolling Admission",
    price: c.price || 250,
    delivery: c.delivery || "online",
    mode: c.mode || "Instructor-led",
    language: c.language || "English",
    skill_level: c.skill_level || "beginner",
    category: categories[c.id] || "Technology",
    certification: certifications[c.id] || "USC Upstate & Red Dot Executive Credential",
    requirements: cleanReqs || "Basic computer skills required.",
    curriculum: c.curriculum || "",
    status: c.status || "published",
  };

  insertStmt.run(row);
  console.log(`✅ Seeded Course ${c.id}: ${c.name} (${row.category})`);
}

const count = db.prepare("SELECT COUNT(*) as total FROM courses").get();
console.log("🎉 Successfully populated database. Total courses in SQLite DB:", count.total);
