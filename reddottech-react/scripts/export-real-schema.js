import { initDb, query } from "../server/db.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaFile = path.resolve(__dirname, "../server/schema.sql");

function escapeSql(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "number") return val;
  if (typeof val === "boolean") return val ? 1 : 0;
  if (val instanceof Date) {
    return `'${val.toISOString().slice(0, 19).replace("T", " ")}'`;
  }
  const str = String(val)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");
  return `'${str}'`;
}

async function exportRealSchema() {
  await initDb();
  console.log("Exporting 100% authentic database data to server/schema.sql...");

  let sql = `-- ==============================================================================
-- Red Dot Technologies — Official Production MySQL Database Schema & Real Data
-- Auto-generated from live Red Dot Technologies MySQL Database
-- Compatible with MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+, and cPanel phpMyAdmin
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

`;

  // 1. COURSES
  sql += `-- ------------------------------------------------------------------------------
-- 1. Table structure for \`courses\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`courses\`;
CREATE TABLE \`courses\` (
  \`id\` VARCHAR(100) NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL,
  \`description\` TEXT,
  \`long_description\` LONGTEXT,
  \`thumbnail\` VARCHAR(500),
  \`banner_image\` VARCHAR(500),
  \`instructor_name\` VARCHAR(255),
  \`instructor_title\` VARCHAR(255),
  \`instructor_image\` VARCHAR(500),
  \`instructor_detail\` LONGTEXT,
  \`duration\` VARCHAR(100),
  \`start_date\` VARCHAR(100),
  \`price\` DECIMAL(10,2) DEFAULT 0.00,
  \`delivery\` VARCHAR(50) DEFAULT 'online',
  \`mode\` VARCHAR(100) DEFAULT 'Instructor-led',
  \`language\` VARCHAR(100) DEFAULT 'English',
  \`skill_level\` VARCHAR(50) DEFAULT 'beginner',
  \`category\` VARCHAR(100) DEFAULT 'Professional Certification',
  \`certification\` VARCHAR(100) DEFAULT 'PECP',
  \`requirements\` LONGTEXT,
  \`curriculum\` LONGTEXT,
  \`status\` VARCHAR(50) DEFAULT 'published',
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_courses_slug\` (\`slug\`),
  INDEX \`idx_courses_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  const courses = await query("SELECT * FROM courses ORDER BY CAST(id AS UNSIGNED) ASC, id ASC");
  if (courses.length > 0) {
    sql += `INSERT INTO \`courses\` (\n  \`id\`, \`name\`, \`slug\`, \`description\`, \`long_description\`, \`thumbnail\`, \`banner_image\`,\n  \`instructor_name\`, \`instructor_title\`, \`instructor_image\`, \`instructor_detail\`,\n  \`duration\`, \`start_date\`, \`price\`, \`delivery\`, \`mode\`, \`language\`, \`skill_level\`,\n  \`category\`, \`certification\`, \`requirements\`, \`curriculum\`, \`status\`, \`created_at\`\n) VALUES\n`;
    const courseValues = courses.map((c) => {
      return `(${escapeSql(c.id)}, ${escapeSql(c.name)}, ${escapeSql(c.slug)}, ${escapeSql(c.description)}, ${escapeSql(c.long_description)}, ${escapeSql(c.thumbnail)}, ${escapeSql(c.banner_image)}, ${escapeSql(c.instructor_name)}, ${escapeSql(c.instructor_title)}, ${escapeSql(c.instructor_image)}, ${escapeSql(c.instructor_detail)}, ${escapeSql(c.duration)}, ${escapeSql(c.start_date)}, ${c.price || 0}, ${escapeSql(c.delivery)}, ${escapeSql(c.mode)}, ${escapeSql(c.language)}, ${escapeSql(c.skill_level)}, ${escapeSql(c.category)}, ${escapeSql(c.certification)}, ${escapeSql(c.requirements)}, ${escapeSql(c.curriculum)}, ${escapeSql(c.status)}, ${escapeSql(c.created_at)})`;
    });
    sql += courseValues.join(",\n") + ";\n\n";
  }

  // 2. CERTIFICATES
  sql += `-- ------------------------------------------------------------------------------
-- 2. Table structure for \`certificates\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`certificates\`;
CREATE TABLE \`certificates\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`school\` VARCHAR(255),
  \`track\` VARCHAR(100) DEFAULT 'foundations',
  \`course_name\` VARCHAR(255) DEFAULT 'AI Foundations: General AI Literacy',
  \`certificate_id\` VARCHAR(100),
  \`organization\` VARCHAR(255),
  \`role\` VARCHAR(255),
  \`department\` VARCHAR(255),
  \`status\` VARCHAR(50) DEFAULT 'valid',
  \`completed_at\` DATETIME,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_certificates_email\` (\`email\`),
  INDEX \`idx_certificates_code\` (\`certificate_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  const certs = await query("SELECT * FROM certificates ORDER BY id ASC");
  if (certs.length > 0) {
    sql += `INSERT INTO \`certificates\` (\`id\`, \`name\`, \`email\`, \`school\`, \`track\`, \`course_name\`, \`certificate_id\`, \`organization\`, \`role\`, \`department\`, \`status\`, \`completed_at\`, \`created_at\`) VALUES\n`;
    const certValues = certs.map((c) => {
      return `(${c.id}, ${escapeSql(c.name)}, ${escapeSql(c.email)}, ${escapeSql(c.school)}, ${escapeSql(c.track || "foundations")}, ${escapeSql(c.course_name || "AI Foundations: General AI Literacy")}, ${escapeSql(c.certificate_id || `RDT-FOUNDATIONS-${c.id}`)}, ${escapeSql(c.organization)}, ${escapeSql(c.role)}, ${escapeSql(c.department)}, ${escapeSql(c.status || "valid")}, ${escapeSql(c.completed_at)}, ${escapeSql(c.created_at)})`;
    });
    sql += certValues.join(",\n") + ";\n\n";
  }

  // 3. CONTACTS
  sql += `-- ------------------------------------------------------------------------------
-- 3. Table structure for \`contacts\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`contacts\`;
CREATE TABLE \`contacts\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`first_name\` VARCHAR(100) NOT NULL,
  \`last_name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(50),
  \`subject\` VARCHAR(255),
  \`message\` TEXT NOT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_contacts_created\` (\`created_at\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  const contacts = await query("SELECT * FROM contacts ORDER BY id ASC");
  if (contacts.length > 0) {
    sql += `INSERT INTO \`contacts\` (\`id\`, \`first_name\`, \`last_name\`, \`email\`, \`phone\`, \`subject\`, \`message\`, \`created_at\`) VALUES\n`;
    const contactValues = contacts.map((c) => {
      return `(${c.id}, ${escapeSql(c.first_name)}, ${escapeSql(c.last_name)}, ${escapeSql(c.email)}, ${escapeSql(c.phone)}, ${escapeSql(c.subject)}, ${escapeSql(c.message)}, ${escapeSql(c.created_at)})`;
    });
    sql += contactValues.join(",\n") + ";\n\n";
  }

  // 4. SUBSCRIPTIONS
  sql += `-- ------------------------------------------------------------------------------
-- 4. Table structure for \`subscriptions\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`subscriptions\`;
CREATE TABLE \`subscriptions\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`email\` VARCHAR(255) NOT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`idx_subscriptions_email\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  const subs = await query("SELECT * FROM subscriptions ORDER BY id ASC");
  if (subs.length > 0) {
    sql += `INSERT INTO \`subscriptions\` (\`id\`, \`email\`, \`created_at\`) VALUES\n`;
    const subValues = subs.map(
      (s) => `(${s.id}, ${escapeSql(s.email)}, ${escapeSql(s.created_at)})`,
    );
    sql += subValues.join(",\n") + ";\n\n";
  }

  // 5. SETTINGS
  sql += `-- ------------------------------------------------------------------------------
-- 5. Table structure for \`settings\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`settings\`;
CREATE TABLE \`settings\` (
  \`key\` VARCHAR(100) NOT NULL,
  \`value\` LONGTEXT NOT NULL,
  PRIMARY KEY (\`key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  const settings = await query("SELECT * FROM settings ORDER BY `key` ASC");
  if (settings.length > 0) {
    sql += `INSERT INTO \`settings\` (\`key\`, \`value\`) VALUES\n`;
    const settingValues = settings.map((s) => `(${escapeSql(s.key)}, ${escapeSql(s.value)})`);
    sql += settingValues.join(",\n") + ";\n\n";
  }

  // 6. ADMIN USERS & SESSIONS
  sql += `-- ------------------------------------------------------------------------------
-- 6. Table structure for \`admin_users\` & \`admin_sessions\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`admin_users\`;
CREATE TABLE \`admin_users\` (
  \`email\` VARCHAR(255) NOT NULL,
  \`name\` VARCHAR(255),
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`password_salt\` VARCHAR(255) NOT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  const admins = await query("SELECT * FROM admin_users ORDER BY email ASC");
  if (admins.length > 0) {
    sql += `INSERT INTO \`admin_users\` (\`email\`, \`name\`, \`password_hash\`, \`password_salt\`, \`created_at\`) VALUES\n`;
    const adminValues = admins.map(
      (a) =>
        `(${escapeSql(a.email)}, ${escapeSql(a.name)}, ${escapeSql(a.password_hash)}, ${escapeSql(a.password_salt)}, ${escapeSql(a.created_at)})`,
    );
    sql += adminValues.join(",\n") + ";\n\n";
  }

  sql += `DROP TABLE IF EXISTS \`admin_sessions\`;
CREATE TABLE \`admin_sessions\` (
  \`token\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`expires_at\` DATETIME NOT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`token\`),
  INDEX \`idx_admin_sessions_email\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. Table structure for \`ai_leads\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`ai_leads\`;
CREATE TABLE \`ai_leads\` (
  \`id\` VARCHAR(100) NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`org\` VARCHAR(255) DEFAULT '',
  \`track\` VARCHAR(100) NOT NULL DEFAULT 'healthcare',
  \`txn\` VARCHAR(255) DEFAULT '',
  \`status\` VARCHAR(50) NOT NULL DEFAULT 'pending',
  \`access_code\` VARCHAR(255) DEFAULT '',
  \`notes\` TEXT DEFAULT NULL,
  \`email_sent\` TINYINT(1) DEFAULT 0,
  \`email_sent_at\` DATETIME DEFAULT NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_ai_leads_track\` (\`track\`),
  INDEX \`idx_ai_leads_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

`;

  const leads = await query("SELECT * FROM ai_leads ORDER BY created_at DESC");
  if (leads.length > 0) {
    sql += `INSERT INTO \`ai_leads\` (\`id\`, \`name\`, \`email\`, \`org\`, \`track\`, \`txn\`, \`status\`, \`access_code\`, \`notes\`, \`email_sent\`, \`email_sent_at\`, \`created_at\`) VALUES\n`;
    const leadValues = leads.map(
      (l) =>
        `(${escapeSql(l.id)}, ${escapeSql(l.name)}, ${escapeSql(l.email)}, ${escapeSql(l.org)}, ${escapeSql(l.track)}, ${escapeSql(l.txn)}, ${escapeSql(l.status)}, ${escapeSql(l.access_code)}, ${escapeSql(l.notes)}, ${l.email_sent ? 1 : 0}, ${escapeSql(l.email_sent_at)}, ${escapeSql(l.created_at)})`,
    );
    sql += leadValues.join(",\n") + ";\n\n";
  }

  sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;

  fs.writeFileSync(schemaFile, sql, "utf-8");
  console.log("✅ Successfully exported real database to server/schema.sql!");
  console.log(` - Courses: ${courses.length}`);
  console.log(` - Certificates: ${certs.length}`);
  console.log(` - Contacts: ${contacts.length}`);
  console.log(` - Subscriptions: ${subs.length}`);
  console.log(` - Settings: ${settings.length}`);
  console.log(` - Admins: ${admins.length}`);
  console.log(` - Leads: ${leads.length}`);
  process.exit(0);
}

exportRealSchema().catch((err) => {
  console.error("Export error:", err);
  process.exit(1);
});
