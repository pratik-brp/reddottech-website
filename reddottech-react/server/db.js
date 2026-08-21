import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env configuration
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "reddottech_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: "utf8mb4",
};

let pool = null;
let isInitialized = false;

/**
 * Initialize MySQL Connection Pool & ensure database / tables exist.
 */
export async function initDb() {
  if (isInitialized && pool) return pool;

  try {
    // Attempt 1: If user has permissions or database is already created in cPanel,
    // connect directly to the database.
    pool = mysql.createPool(dbConfig);

    // Test connection
    const connection = await pool.getConnection();
    connection.release();
    console.log(`[MySQL] ✅ Connected to MySQL database "${dbConfig.database}" at ${dbConfig.host}:${dbConfig.port}`);
  } catch (err) {
    // If error 1049 (Unknown database), try creating it using a root/server connection
    if (err.code === "ER_BAD_DB_ERROR" || err.errno === 1049) {
      console.log(`[MySQL] ⚠️ Database "${dbConfig.database}" does not exist. Attempting to create it...`);
      try {
        const rootConn = await mysql.createConnection({
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.user,
          password: dbConfig.password,
        });
        await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        await rootConn.end();
        console.log(`[MySQL] ✅ Created database "${dbConfig.database}"`);

        // Reconnect pool to newly created database
        pool = mysql.createPool(dbConfig);
      } catch (createErr) {
        console.error(`[MySQL] ❌ Could not auto-create database. Please create database "${dbConfig.database}" in cPanel MySQL Wizard or phpMyAdmin. Error:`, createErr.message);
        throw createErr;
      }
    } else {
      console.error(`[MySQL] ❌ Database connection failed:`, err.message);
      throw err;
    }
  }

  // Create tables if they do not exist
  await createTables();
  isInitialized = true;
  return pool;
}

/**
 * Run table creation scripts (safe and idempotent for cPanel & local)
 */
async function createTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS courses (
      id VARCHAR(100) NOT NULL,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      description TEXT,
      long_description LONGTEXT,
      thumbnail VARCHAR(500),
      banner_image VARCHAR(500),
      instructor_name VARCHAR(255),
      instructor_title VARCHAR(255),
      instructor_image VARCHAR(500),
      instructor_detail LONGTEXT,
      duration VARCHAR(100),
      start_date VARCHAR(100),
      price DECIMAL(10,2) DEFAULT 0.00,
      delivery VARCHAR(50) DEFAULT 'online',
      mode VARCHAR(100) DEFAULT 'Instructor-led',
      language VARCHAR(100) DEFAULT 'English',
      skill_level VARCHAR(50) DEFAULT 'beginner',
      category VARCHAR(100) DEFAULT 'Professional Certification',
      certification VARCHAR(100) DEFAULT 'PECP',
      requirements LONGTEXT,
      curriculum LONGTEXT,
      status VARCHAR(50) DEFAULT 'published',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_courses_slug (slug),
      INDEX idx_courses_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    `CREATE TABLE IF NOT EXISTS certificates (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      school VARCHAR(255),
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_certificates_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    `CREATE TABLE IF NOT EXISTS contacts (
      id INT NOT NULL AUTO_INCREMENT,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_contacts_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    `CREATE TABLE IF NOT EXISTS subscriptions (
      id INT NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY idx_subscriptions_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    `CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(100) NOT NULL,
      \`value\` LONGTEXT NOT NULL,
      PRIMARY KEY (\`key\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    `CREATE TABLE IF NOT EXISTS admin_users (
      email VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      password_hash VARCHAR(255) NOT NULL,
      password_salt VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    `CREATE TABLE IF NOT EXISTS admin_sessions (
      token VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (token),
      INDEX idx_admin_sessions_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    `CREATE TABLE IF NOT EXISTS password_reset_tokens (
      token VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (token),
      INDEX idx_password_reset_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

    `CREATE TABLE IF NOT EXISTS ai_leads (
      id VARCHAR(100) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      org VARCHAR(255),
      track VARCHAR(50) NOT NULL,
      txn VARCHAR(100),
      status VARCHAR(50) DEFAULT 'pending',
      access_code VARCHAR(100),
      notes TEXT,
      receipt_url VARCHAR(500),
      email_sent TINYINT(1) DEFAULT 0,
      email_sent_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_ai_leads_track (track),
      INDEX idx_ai_leads_status (status),
      INDEX idx_ai_leads_email (email),
      INDEX idx_ai_leads_access_code (access_code)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  ];

  for (const q of queries) {
    await pool.query(q);
  }
}

/**
 * Async query helper returning array of rows
 */
export async function query(sql, params = []) {
  if (!pool) await initDb();
  const [rows] = await pool.query(sql, params);
  return rows;
}

/**
 * Async query helper returning single row or null
 */
export async function get(sql, params = []) {
  if (!pool) await initDb();
  const [rows] = await pool.query(sql, params);
  return rows && rows.length > 0 ? rows[0] : null;
}

/**
 * Async run helper returning result metadata (insertId, affectedRows)
 */
export async function run(sql, params = []) {
  if (!pool) await initDb();
  const [result] = await pool.query(sql, params);
  return result;
}

export { pool, dbConfig };
