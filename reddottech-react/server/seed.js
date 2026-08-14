import { db } from "./db.js";
import { hashPassword } from "./auth.js";

/**
 * Idempotent database seed. Safe to run on every server start:
 * - inserts default settings only if missing
 * - creates a default admin account only when none exists
 */
export function seedDatabase() {
  const now = new Date().toISOString();

  // Default settings (only inserted when the key is absent)
  const defaults = [
    ["batch_banner_title", "First batch begins November 15, 2026.\nLimited seats available."],
    ["batch_banner_subtitle", "Take the next step toward a globally recognized career."],
    ["batch_banner_button_text", "Enroll Now"],
  ];
  const insertSetting = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
  for (const [key, value] of defaults) {
    insertSetting.run(key, value);
  }

  // Default admin account (only when the admin table is empty)
  const adminCount = db.prepare("SELECT COUNT(*) AS count FROM admin_users").get().count;
  if (adminCount === 0) {
    const email = (process.env.ADMIN_EMAIL || "info@reddottech.com.np").toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD || "admin123";

    const { salt, hash } = hashPassword(password);
    db.prepare(
      "INSERT INTO admin_users (email, name, password_hash, password_salt, created_at) VALUES (?, ?, ?, ?, ?)",
    ).run(email, "Administrator", hash, salt, now);

    console.log("🔐 Created default admin account.");
    console.log(`   Email: ${email}`);
    if (process.env.ADMIN_PASSWORD) {
      console.log("   Password: from ADMIN_PASSWORD environment variable (not printed).");
    } else {
      console.log("   Password: admin123 (default — change it after first login)");
    }
    console.log("   You can change the password anytime under Admin → Settings → Change Password.");
  }
}
