import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../../database/database.sqlite");

console.log("Reading SQLite from:", dbPath);
const db = new Database(dbPath);

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(
  "Tables found:",
  tables.map((t) => t.name),
);

for (const t of tables) {
  try {
    const count = db.prepare(`SELECT count(*) as count FROM "${t.name}"`).get();
    console.log(`Table ${t.name}: ${count.count} rows`);
  } catch (err) {
    console.log(`Error checking table ${t.name}:`, err.message);
  }
}

// Inspect courses columns
const cols = db.prepare("PRAGMA table_info(courses)").all();
console.log(
  "\nCourses table columns:",
  cols.map((c) => c.name),
);

// Search for ??? or corrupted characters across courses
const courses = db.prepare("SELECT * FROM courses").all();
console.log(`\nInspecting ${courses.length} courses for ??? or strange chars...`);

let questionMarksFound = 0;
for (const c of courses) {
  for (const [key, val] of Object.entries(c)) {
    if (
      typeof val === "string" &&
      (val.includes("???") || val.includes("â€") || val.includes("Ã©") || val.includes("Ã"))
    ) {
      console.log(`[FOUND CORRUPTION in Course ID ${c.id}] field: ${key}`);
      console.log(`Snippet: ${val.substring(0, 150)}...\n`);
      questionMarksFound++;
    }
  }
}

console.log(`Total corrupted fields found in original SQLite: ${questionMarksFound}`);

// Print the first course to check text
if (courses.length > 0) {
  console.log("\nSample Course 1:");
  console.log("Name:", courses[0].name || courses[0].title);
  console.log("Description snippet:", String(courses[0].description).substring(0, 150));
  console.log("Curriculum snippet:", String(courses[0].curriculum).substring(0, 200));
}
