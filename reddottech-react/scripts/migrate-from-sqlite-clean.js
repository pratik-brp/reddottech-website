import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initDb, query, run, get, dbConfig } from "../server/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find SQLite database file from multiple possible paths
const possiblePaths = [
  path.resolve(__dirname, "../../database/database.sqlite"),
  path.resolve(__dirname, "../database/database.sqlite"),
  path.resolve(__dirname, "../server/data/database.sqlite"),
];

let sqlitePath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    sqlitePath = p;
    break;
  }
}

if (!sqlitePath) {
  console.error("❌ Could not find database.sqlite file in any expected path!");
  process.exit(1);
}

console.log("📂 Using SQLite Database at:", sqlitePath);
const sqliteDb = new Database(sqlitePath, { readonly: true });

/**
 * Text cleaner to fix any legacy encoding / replacement character artifacts
 */
function cleanText(val) {
  if (typeof val !== "string") return val;

  let cleaned = val;

  // Replace erroneous triple/double question marks from past legacy bad encodings if any
  // e.g., "Lesson 1 ??? DMAIC" -> "Lesson 1 – DMAIC"
  cleaned = cleaned.replace(/Lesson\s+(\d+)\s*\?{2,3}\s*/g, "Lesson $1 – ");
  cleaned = cleaned.replace(/Part\s+([I|V|X]+)\s*\?{2,3}\s*/g, "Part $1 – ");
  cleaned = cleaned.replace(/you\?{2,3}ll/gi, "you'll");
  cleaned = cleaned.replace(/it\?{2,3}s/gi, "it's");
  cleaned = cleaned.replace(/that\?{2,3}s/gi, "that's");
  cleaned = cleaned.replace(/don\?{2,3}t/gi, "don't");
  cleaned = cleaned.replace(/can\?{2,3}t/gi, "can't");
  cleaned = cleaned.replace(/won\?{2,3}t/gi, "won't");
  cleaned = cleaned.replace(/they\?{2,3}re/gi, "they're");
  cleaned = cleaned.replace(/we\?{2,3}ll/gi, "we'll");
  cleaned = cleaned.replace(/I\?{2,3}ll/gi, "I'll");
  cleaned = cleaned.replace(/CFP\s*\?{2,3}/g, "CFP®");
  cleaned = cleaned.replace(/PMP\s*\?{2,3}/g, "PMP®");
  cleaned = cleaned.replace(/CSSBB\s*\?{2,3}/g, "CSSBB®");
  cleaned = cleaned.replace(/CAPM\s*\?{2,3}/g, "CAPM®");
  cleaned = cleaned.replace(/PMI\s*\?{2,3}/g, "PMI®");
  cleaned = cleaned.replace(/Quality\s*\?{2,3}/g, "Quality®");
  cleaned = cleaned.replace(/\?{2,3}scoping\?{2,3}/g, "“scoping”");
  cleaned = cleaned.replace(
    /\?{2,3}the highest-paying certification\?{2,3}/g,
    "“the highest-paying certification”",
  );
  cleaned = cleaned.replace(/\?{2,3}learn\?{2,3}/g, "“learn”");
  cleaned = cleaned.replace(/\?{2,3}soft skills\?{2,3}/g, "“soft skills”");
  cleaned = cleaned.replace(/\?{2,3}speaks the language\?{2,3}/g, "“speaks the language”");

  return cleaned;
}

async function migrate() {
  await initDb();
  console.log("✅ Connected to MySQL database:", dbConfig.database);

  // 1. Migrate Courses
  const courses = sqliteDb.prepare("SELECT * FROM courses").all();
  console.log(`\n📚 Migrating ${courses.length} courses with clean UTF-8 text...`);

  // Ensure table uses utf8mb4
  await run("ALTER TABLE courses CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

  for (const c of courses) {
    const slug = c.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const rawDesc = cleanText(c.description || "");
    const plainDesc = rawDesc.replace(/<[^>]*>?/gm, "").trim();
    const shortDesc = plainDesc.length > 180 ? plainDesc.slice(0, 180).trim() + "..." : plainDesc;

    const thumbnail = c.thumbnail?.startsWith("/") ? c.thumbnail : `/storage/${c.thumbnail}`;
    const bannerImage = c.banner_image?.startsWith("/")
      ? c.banner_image
      : `/storage/${c.banner_image}`;

    const cleanedName = cleanText(c.name);
    const cleanedInstructorName = cleanText(c.instructor_name || "Faculty Specialist");
    const cleanedInstructorTitle = cleanText(c.instructor_title || "Senior Faculty");
    const cleanedInstructorDetail = cleanText(c.instructor_detail || "");
    const cleanedCurriculum = cleanText(c.curriculum || "");
    const cleanedRequirements = cleanText(c.requirements || "");
    const cleanedCertification = cleanText(c.certification || "PECP Certified");

    await run(
      `INSERT INTO courses (
        id, name, slug, description, long_description, thumbnail, banner_image,
        instructor_name, instructor_title, instructor_image, instructor_detail,
        duration, start_date, price, delivery, mode, language, skill_level,
        category, certification, requirements, curriculum, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        slug = VALUES(slug),
        description = VALUES(description),
        long_description = VALUES(long_description),
        thumbnail = VALUES(thumbnail),
        banner_image = VALUES(banner_image),
        instructor_name = VALUES(instructor_name),
        instructor_title = VALUES(instructor_title),
        instructor_image = VALUES(instructor_image),
        instructor_detail = VALUES(instructor_detail),
        duration = VALUES(duration),
        start_date = VALUES(start_date),
        price = VALUES(price),
        delivery = VALUES(delivery),
        mode = VALUES(mode),
        language = VALUES(language),
        skill_level = VALUES(skill_level),
        category = VALUES(category),
        certification = VALUES(certification),
        requirements = VALUES(requirements),
        curriculum = VALUES(curriculum),
        status = VALUES(status)`,
      [
        String(c.id),
        cleanedName,
        slug,
        shortDesc,
        rawDesc,
        thumbnail,
        bannerImage,
        cleanedInstructorName,
        cleanedInstructorTitle,
        c.instructor_image || "/images/instructor/instructor1.png",
        cleanedInstructorDetail,
        c.duration || "6 weeks",
        c.start_date || "Rolling Admission",
        Number(c.price) || 250,
        c.delivery || "online",
        c.mode || "Instructor-led",
        c.language || "English",
        c.skill_level || "beginner",
        c.category || "Professional Certification",
        cleanedCertification,
        cleanedRequirements,
        cleanedCurriculum,
        c.status || "published",
        c.created_at || new Date().toISOString(),
      ],
    );
    console.log(`  ✓ Migrated course: [${c.id}] ${cleanedName}`);
  }

  // 2. Migrate Certificates
  try {
    const certs = sqliteDb.prepare("SELECT * FROM certificates").all();
    console.log(`\n🏆 Migrating ${certs.length} certificates...`);
    for (const cert of certs) {
      await run(
        `INSERT INTO certificates (id, name, email, school, completed_at, created_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email), school = VALUES(school), completed_at = VALUES(completed_at)`,
        [
          cert.id,
          cleanText(cert.name),
          cleanText(cert.email),
          cleanText(cert.school || null),
          cert.completed_at || null,
          cert.created_at || new Date().toISOString(),
        ],
      );
    }
  } catch (e) {
    console.log("  Skip certificates:", e.message);
  }

  // 3. Migrate Contacts
  try {
    const contacts = sqliteDb.prepare("SELECT * FROM contacts").all();
    console.log(`\n📬 Migrating ${contacts.length} contacts...`);
    for (const con of contacts) {
      await run(
        `INSERT INTO contacts (id, first_name, last_name, email, phone, subject, message, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE first_name = VALUES(first_name), last_name = VALUES(last_name), email = VALUES(email), phone = VALUES(phone), subject = VALUES(subject), message = VALUES(message)`,
        [
          con.id,
          cleanText(con.first_name),
          cleanText(con.last_name || ""),
          cleanText(con.email),
          cleanText(con.phone || ""),
          cleanText(con.subject || "General Inquiry"),
          cleanText(con.message),
          con.created_at || new Date().toISOString(),
        ],
      );
    }
  } catch (e) {
    console.log("  Skip contacts:", e.message);
  }

  // 4. Migrate Subscriptions
  try {
    const subs = sqliteDb.prepare("SELECT * FROM subscriptions").all();
    console.log(`\n🔔 Migrating ${subs.length} subscriptions...`);
    for (const s of subs) {
      await run(
        `INSERT INTO subscriptions (id, email, created_at)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE email = VALUES(email)`,
        [s.id, cleanText(s.email), s.created_at || new Date().toISOString()],
      );
    }
  } catch (e) {
    console.log("  Skip subscriptions:", e.message);
  }

  // 5. Migrate Settings
  try {
    const settings = sqliteDb.prepare("SELECT * FROM settings").all();
    console.log(`\n⚙️ Migrating ${settings.length} settings...`);
    for (const s of settings) {
      await run(
        "INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)",
        [cleanText(s.key), cleanText(s.value)],
      );
    }
  } catch (e) {
    console.log("  Skip settings:", e.message);
  }

  console.log("\n🎉 Complete clean migration finished successfully!");
  sqliteDb.close();
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
