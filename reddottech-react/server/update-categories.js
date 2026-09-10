import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function updateCategories() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "reddottech_db",
  });

  await conn.query("UPDATE courses SET category = 'Web Development' WHERE id = 'course-1788413059055-7d47f17d'");
  await conn.query("UPDATE courses SET category = 'Programming & Software' WHERE id = 'course-1788413832348-df86fdfd'");
  await conn.query("UPDATE courses SET category = 'Programming & Software' WHERE id = 'course-1788414064703-bfd12496'");
  await conn.query("UPDATE courses SET category = 'Digital Marketing' WHERE id = 'course-1788414333268-fd078c76'");

  const [courses] = await conn.query("SELECT id, name, category FROM courses ORDER BY id ASC");
  console.log("Updated course categories in local MySQL:");
  courses.forEach((c) => console.log(` * ${c.name} => [${c.category}]`));
  await conn.end();
}

updateCategories().catch((err) => {
  console.error("Error updating categories:", err);
  process.exit(1);
});
