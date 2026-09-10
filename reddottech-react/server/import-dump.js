import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function importDatabase() {
  const sqlFilePath = path.resolve(__dirname, "../../brpgroup_reddot_db.sql");
  if (!fs.existsSync(sqlFilePath)) {
    console.error("SQL file not found at:", sqlFilePath);
    process.exit(1);
  }

  console.log("Reading SQL dump from:", sqlFilePath);
  const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

  const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  };

  const targetDb = process.env.DB_NAME || "reddottech_db";

  console.log(`Connecting to MySQL at ${dbConfig.host}:${dbConfig.port}...`);
  const connection = await mysql.createConnection(dbConfig);

  console.log(`Creating database ${targetDb} if not exists...`);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${targetDb}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await connection.query(`USE \`${targetDb}\`;`);

  console.log("Preparing database tables...");
  await connection.query(`
    SET FOREIGN_KEY_CHECKS = 0;
    DROP TABLE IF EXISTS \`admin_sessions\`, \`admin_users\`, \`ai_leads\`, \`certificates\`, \`contacts\`, \`courses\`, \`password_reset_tokens\`, \`settings\`, \`subscriptions\`;
    SET FOREIGN_KEY_CHECKS = 1;
  `);

  console.log("Executing SQL statements into database...");
  await connection.query(sqlContent);

  console.log("✅ SQL dump successfully imported into", targetDb);

  // Check counts
  const [courses] = await connection.query("SELECT id, name, category, price FROM courses");
  console.log(`\nFound ${courses.length} courses in database:`);
  courses.forEach((c) => console.log(` - [${c.id}] ${c.name} (${c.category})`));

  const [settings] = await connection.query("SELECT count(*) as count FROM settings");
  console.log(`\nSettings count: ${settings[0].count}`);

  const [certificates] = await connection.query("SELECT count(*) as count FROM certificates");
  console.log(`Certificates count: ${certificates[0].count}`);

  const [contacts] = await connection.query("SELECT count(*) as count FROM contacts");
  console.log(`Contacts count: ${contacts[0].count}`);

  await connection.end();
}

importDatabase().catch((err) => {
  console.error("❌ Error importing database:", err.message);
  if (err.sqlMessage) console.error("SQL Error:", err.sqlMessage);
  if (err.sql) console.error("Near SQL:", err.sql.slice(0, 300));
  process.exit(1);
});
