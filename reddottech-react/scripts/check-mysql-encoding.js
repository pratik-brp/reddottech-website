import { initDb, query, dbConfig } from "../server/db.js";

async function main() {
  await initDb();
  console.log("Connected to MySQL database:", dbConfig.database);

  const courses = await query(
    "SELECT id, name, description, curriculum, instructor_name, instructor_detail FROM courses",
  );
  console.log(`\nFound ${courses.length} courses in MySQL.`);

  let corruptedCount = 0;
  for (const c of courses) {
    for (const [key, val] of Object.entries(c)) {
      if (typeof val === "string") {
        if (
          val.includes("???") ||
          val.includes("â€") ||
          val.includes("Ã©") ||
          val.includes("") ||
          val.includes("???")
        ) {
          console.log(`[CORRUPT CHARS in MySQL Course ${c.id} - ${c.name}] field: ${key}`);
          console.log(`Preview: ${val.substring(0, 120)}...\n`);
          corruptedCount++;
        }
      }
    }
  }

  console.log(`Total corrupted fields found in MySQL: ${corruptedCount}`);

  for (const c of courses) {
    console.log(`\n--- Course ${c.id}: ${c.name} ---`);
    console.log("Instructor:", c.instructor_name);
    console.log("Description snippet:", String(c.description).substring(0, 100));
    console.log("Curriculum snippet:", String(c.curriculum).substring(0, 120));
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
