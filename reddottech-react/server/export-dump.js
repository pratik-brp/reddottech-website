import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function syncDump() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "reddottech_db",
  });

  const [tables] = await conn.query("SHOW TABLES");
  const tableNames = tables.map((t) => Object.values(t)[0]);

  let sqlDump = `-- Red Dot Technologies Production & Local Database Dump
-- Generated: ${new Date().toISOString()}
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

`;

  for (const table of tableNames) {
    sqlDump += `-- --------------------------------------------------------\n`;
    sqlDump += `-- Table structure for table \`${table}\`\n--\n`;
    sqlDump += `DROP TABLE IF EXISTS \`${table}\`;\n`;
    const [[createRow]] = await conn.query(`SHOW CREATE TABLE \`${table}\``);
    sqlDump += `${createRow["Create Table"]};\n\n`;

    const [rows] = await conn.query(`SELECT * FROM \`${table}\``);
    if (rows.length > 0) {
      sqlDump += `-- Dumping data for table \`${table}\`\n--\n`;
      const cols = Object.keys(rows[0])
        .map((c) => `\`${c}\``)
        .join(", ");
      const values = rows
        .map((r) => {
          return (
            "(" +
            Object.values(r)
              .map((val) => {
                if (val === null) return "NULL";
                if (typeof val === "number") return val;
                if (val instanceof Date)
                  return `'${val.toISOString().slice(0, 19).replace("T", " ")}'`;
                return `'${String(val)
                  .replace(/\\/g, "\\\\")
                  .replace(/'/g, "\\'")
                  .replace(/\r/g, "\\r")
                  .replace(/\n/g, "\\n")}'`;
              })
              .join(", ") +
            ")"
          );
        })
        .join(",\n");

      sqlDump += `INSERT INTO \`${table}\` (${cols}) VALUES\n${values};\n\n`;
    }
  }

  sqlDump += `COMMIT;\n\n/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;\n/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;\n/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;\n`;

  fs.writeFileSync(path.resolve(__dirname, "schema.sql"), sqlDump, "utf8");
  fs.writeFileSync(path.resolve(__dirname, "../../brpgroup_reddot_db.sql"), sqlDump, "utf8");
  console.log("Successfully exported synced schema.sql and brpgroup_reddot_db.sql");

  await conn.end();
}

syncDump().catch(console.error);
