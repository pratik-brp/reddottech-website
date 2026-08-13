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

// Ensure required columns exist if migration schema differs slightly
try {
  const courseCols = db.prepare("PRAGMA table_info(courses)").all().map((c) => c.name);
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
  const contactCols = db.prepare("PRAGMA table_info(contacts)").all().map((c) => c.name);
  if (!contactCols.includes("subject")) {
    db.exec("ALTER TABLE contacts ADD COLUMN subject TEXT;");
  }
} catch (e) {
  console.log("Contacts schema check info:", e.message);
}

console.log("✅ Connected to Real PHP Database SQLite file at:", dbPath);
