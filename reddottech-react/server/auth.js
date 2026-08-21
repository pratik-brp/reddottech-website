import crypto from "node:crypto";
import util from "node:util";
import { query, get, run } from "./db.js";

const scryptAsync = util.promisify(crypto.scrypt);
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory login rate limiter (per email + IP) to slow brute force
const loginAttempts = new Map();

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);
  return { salt, hash: derivedKey.toString("hex") };
}

async function verifyPassword(password, salt, expectedHash) {
  try {
    const derivedKey = await scryptAsync(password, salt, 64);
    const a = Buffer.from(derivedKey.toString("hex"), "hex");
    const b = Buffer.from(expectedHash, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

async function createSession(email) {
  const token = crypto.randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_MS);

  // Revoke previous sessions for this admin & purge expired ones
  await run("DELETE FROM admin_sessions WHERE email = ? OR expires_at < NOW()", [email]);
  await run(
    "INSERT INTO admin_sessions (token, email, expires_at, created_at) VALUES (?, ?, ?, NOW())",
    [token, email, expiresAt]
  );
  return token;
}

async function getUserForToken(token) {
  if (!token) return null;
  const row = await get(
    "SELECT token, email, expires_at FROM admin_sessions WHERE token = ?",
    [token]
  );
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await run("DELETE FROM admin_sessions WHERE token = ?", [token]);
    return null;
  }
  return { email: row.email };
}

function extractToken(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}

export async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    const user = await getUserForToken(token);
    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized. Please sign in first." });
    }
    req.admin = user;
    next();
  } catch (err) {
    return res.status(500).json({ success: false, error: "Auth verification failed." });
  }
}

function recordFailedAttempt(key) {
  const now = Date.now();
  const windowStart = now - 15 * 60 * 1000;
  const entry = loginAttempts.get(key);
  if (!entry || entry.resetAt < windowStart) {
    loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return;
  }
  entry.count += 1;
}

function isLocked(key) {
  const entry = loginAttempts.get(key);
  if (!entry || entry.resetAt < Date.now()) return false;
  return entry.count >= 8;
}

export const authHandlers = {
  async login(req, res) {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Email and password are required." });
      }

      const normalizedEmail = String(email).toLowerCase().trim();
      const key = `${req.ip}:${normalizedEmail}`;

      if (isLocked(key)) {
        return res.status(429).json({
          success: false,
          error: "Too many failed attempts. Please try again in 15 minutes.",
        });
      }

      const user = await get(
        "SELECT email, name, password_hash, password_salt FROM admin_users WHERE email = ?",
        [normalizedEmail]
      );

      if (!user) {
        recordFailedAttempt(key);
        return res.status(401).json({ success: false, error: "Invalid email or password." });
      }

      const passwordMatch = await verifyPassword(password, user.password_salt, user.password_hash);
      if (!passwordMatch) {
        recordFailedAttempt(key);
        return res.status(401).json({ success: false, error: "Invalid email or password." });
      }

      loginAttempts.delete(key);
      const token = await createSession(user.email);
      return res.json({
        success: true,
        token,
        email: user.email,
        name: user.name || "Administrator",
      });
    } catch (err) {
      console.error("[Login Error]:", err);
      return res.status(500).json({ success: false, error: "Internal server error." });
    }
  },

  async logout(req, res) {
    try {
      const token = extractToken(req);
      if (token) {
        await run("DELETE FROM admin_sessions WHERE token = ?", [token]);
      }
      return res.json({ success: true, message: "Signed out." });
    } catch (err) {
      return res.status(500).json({ success: false, error: "Logout failed." });
    }
  },

  async me(req, res) {
    try {
      const user = await getUserForToken(extractToken(req));
      if (!user) {
        return res.status(401).json({ success: false, error: "Unauthorized." });
      }
      const admin = await get("SELECT email, name FROM admin_users WHERE email = ?", [user.email]);
      return res.json({ success: true, data: admin || { email: user.email } });
    } catch (err) {
      return res.status(500).json({ success: false, error: "User fetch failed." });
    }
  },

  async changePassword(req, res) {
    try {
      const user = await getUserForToken(extractToken(req));
      if (!user) {
        return res.status(401).json({ success: false, error: "Unauthorized." });
      }

      const { currentPassword, newPassword } = req.body || {};
      if (!currentPassword || !newPassword) {
        return res
          .status(400)
          .json({ success: false, error: "Current and new password are required." });
      }
      if (String(newPassword).length < 8) {
        return res
          .status(400)
          .json({ success: false, error: "New password must be at least 8 characters." });
      }

      const admin = await get(
        "SELECT email, password_hash, password_salt FROM admin_users WHERE email = ?",
        [user.email]
      );
      if (!admin) {
        return res.status(404).json({ success: false, error: "Admin account not found." });
      }
      const currentValid = await verifyPassword(currentPassword, admin.password_salt, admin.password_hash);
      if (!currentValid) {
        return res.status(401).json({ success: false, error: "Current password is incorrect." });
      }

      const { salt, hash } = await hashPassword(newPassword);
      await run(
        "UPDATE admin_users SET password_hash = ?, password_salt = ? WHERE email = ?",
        [hash, salt, admin.email]
      );

      // Revoke all other sessions so the new password takes effect immediately
      await run(
        "DELETE FROM admin_sessions WHERE email = ? AND token <> ?",
        [admin.email, extractToken(req)]
      );

      return res.json({ success: true, message: "Password updated successfully." });
    } catch (err) {
      console.error("[ChangePassword Error]:", err);
      return res.status(500).json({ success: false, error: "Password change failed." });
    }
  },

  async changeEmail(req, res) {
    try {
      const user = await getUserForToken(extractToken(req));
      if (!user) {
        return res.status(401).json({ success: false, error: "Unauthorized." });
      }

      const { newEmail, currentPassword } = req.body || {};
      if (!newEmail || !currentPassword) {
        return res
          .status(400)
          .json({ success: false, error: "New email and current password are required." });
      }

      const normalizedNewEmail = String(newEmail).toLowerCase().trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedNewEmail)) {
        return res.status(400).json({ success: false, error: "Invalid email address format." });
      }

      if (normalizedNewEmail === user.email.toLowerCase()) {
        return res
          .status(400)
          .json({ success: false, error: "New email is the same as your current email." });
      }

      const admin = await get(
        "SELECT email, password_hash, password_salt FROM admin_users WHERE email = ?",
        [user.email]
      );
      if (!admin) {
        return res.status(404).json({ success: false, error: "Admin account not found." });
      }
      const currentValid = await verifyPassword(currentPassword, admin.password_salt, admin.password_hash);
      if (!currentValid) {
        return res.status(401).json({ success: false, error: "Current password is incorrect." });
      }

      // Check if new email is already taken
      const existing = await get("SELECT email FROM admin_users WHERE email = ?", [normalizedNewEmail]);
      if (existing) {
        return res
          .status(409)
          .json({ success: false, error: "An admin account with this email already exists." });
      }

      // Update email in admin_users table
      await run("UPDATE admin_users SET email = ? WHERE email = ?", [normalizedNewEmail, admin.email]);

      // Update email in active admin_sessions table
      await run("UPDATE admin_sessions SET email = ? WHERE email = ?", [normalizedNewEmail, admin.email]);

      return res.json({
        success: true,
        email: normalizedNewEmail,
        message: "Admin login email updated successfully in MySQL database.",
      });
    } catch (err) {
      console.error("[ChangeEmail Error]:", err);
      return res.status(500).json({ success: false, error: "Email change failed." });
    }
  },
};

export { hashPassword, createSession };
