import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const oldDbPath = path.resolve(__dirname, "../../reddottech/database/database.sqlite");
const db = new Database(oldDbPath);

console.log("=== COMPREHENSIVE OLD PHP DATABASE ANALYSIS ===");

const tables = ["courses", "blogs", "certificates", "settings", "contacts", "subscriptions"];

for (const t of tables) {
  try {
    const rows = db.prepare(`SELECT * FROM ${t}`).all();
    console.log(`\nTable '${t}' has ${rows.length} rows.`);
    if (rows.length > 0 && t !== "courses") {
      console.log("Sample row:", JSON.stringify(rows[0], null, 2).slice(0, 300));
    }
  } catch (e) {
    console.log(`Table '${t}' error:`, e.message);
  }
}

// Print full detailed breakdown of all 5 courses
console.log("\n=== FULL BREAKDOWN OF ALL 5 COURSES ===");
const courses = db.prepare("SELECT * FROM courses").all();
for (const c of courses) {
  console.log(`\n--------------------------------------------------`);
  console.log(`ID: ${c.id}`);
  console.log(`NAME: ${c.name}`);
  console.log(`INSTRUCTOR: ${c.instructor_name}`);
  console.log(`PRICE: $${c.price}`);
  console.log(`DURATION: ${c.duration}`);
  console.log(`DELIVERY: ${c.delivery} | MODE: ${c.mode} | LEVEL: ${c.skill_level}`);
  console.log(`THUMBNAIL: ${c.thumbnail}`);
  console.log(`BANNER: ${c.banner_image}`);
  console.log(`\n[DESCRIPTION]\n${c.description}`);
  console.log(`\n[INSTRUCTOR DETAIL]\n${c.instructor_detail}`);
  console.log(`\n[REQUIREMENTS]\n${c.requirements}`);
  console.log(`\n[CURRICULUM]\n${c.curriculum}`);
}
