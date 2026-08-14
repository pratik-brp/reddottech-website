import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "database.sqlite");
export const db = new Database(dbPath);

// Enable WAL mode for high performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Ensure all required tables exist. Keeps the backend resilient even if the
// SQLite file is recreated from scratch.
db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
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
    status TEXT DEFAULT 'published',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    school TEXT,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    email TEXT PRIMARY KEY,
    name TEXT,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_admin_sessions_email ON admin_sessions(email);
  CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
`);

// Ensure required columns exist if an older schema differs slightly
try {
  const courseCols = db
    .prepare("PRAGMA table_info(courses)")
    .all()
    .map((c) => c.name);
  if (!courseCols.includes("slug")) {
    db.exec("ALTER TABLE courses ADD COLUMN slug TEXT;");
  }
  if (!courseCols.includes("long_description")) {
    db.exec("ALTER TABLE courses ADD COLUMN long_description TEXT;");
  }
  if (!courseCols.includes("instructor_title")) {
    db.exec("ALTER TABLE courses ADD COLUMN instructor_title TEXT;");
  }
  if (!courseCols.includes("instructor_image")) {
    db.exec("ALTER TABLE courses ADD COLUMN instructor_image TEXT;");
  }
  if (!courseCols.includes("category")) {
    db.exec("ALTER TABLE courses ADD COLUMN category TEXT;");
  }
} catch (e) {
  console.log("Schema check info:", e.message);
}

try {
  const contactCols = db
    .prepare("PRAGMA table_info(contacts)")
    .all()
    .map((c) => c.name);
  if (!contactCols.includes("subject")) {
    db.exec("ALTER TABLE contacts ADD COLUMN subject TEXT;");
  }
} catch (e) {
  console.log("Contacts schema check info:", e.message);
}

console.log("✅ Connected to SQLite database at:", dbPath);
