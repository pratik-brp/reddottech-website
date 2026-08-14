import crypto from "node:crypto";
import { db } from "./db.js";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Simple in-memory login rate limiter (per email + IP) to slow brute force.
const loginAttempts = new Map();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function verifyPassword(password, salt, expectedHash) {
  try {
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    const a = Buffer.from(hash, "hex");
    const b = Buffer.from(expectedHash, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function createSession(email) {
  const token = crypto.randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_MS).toISOString();
  // Revoke any previous sessions for the same admin and purge expired ones.
  db.prepare("DELETE FROM admin_sessions WHERE email = ? OR expires_at < ?").run(
    email,
    now.toISOString(),
  );
  db.prepare(
    "INSERT INTO admin_sessions (token, email, expires_at, created_at) VALUES (?, ?, ?, ?)",
  ).run(token, email, expiresAt, now.toISOString());
  return token;
}

function getUserForToken(token) {
  if (!token) return null;
  const row = db
    .prepare("SELECT token, email, expires_at FROM admin_sessions WHERE token = ?")
    .get(token);
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
    return null;
  }
  return { email: row.email };
}

function extractToken(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}

export function requireAuth(req, res, next) {
  const user = getUserForToken(extractToken(req));
  if (!user) {
    return res.status(401).json({ success: false, error: "Unauthorized. Please sign in first." });
  }
  req.admin = user;
  next();
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
  login(req, res) {
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

    const user = db
      .prepare("SELECT email, name, password_hash, password_salt FROM admin_users WHERE email = ?")
      .get(normalizedEmail);

    if (!user || !verifyPassword(password, user.password_salt, user.password_hash)) {
      recordFailedAttempt(key);
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    loginAttempts.delete(key);
    const token = createSession(user.email);
    return res.json({
      success: true,
      token,
      email: user.email,
      name: user.name || "Administrator",
    });
  },

  logout(req, res) {
    const token = extractToken(req);
    if (token) {
      db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
    }
    return res.json({ success: true, message: "Signed out." });
  },

  me(req, res) {
    const user = getUserForToken(extractToken(req));
    if (!user) {
      return res.status(401).json({ success: false, error: "Unauthorized." });
    }
    const admin = db.prepare("SELECT email, name FROM admin_users WHERE email = ?").get(user.email);
    return res.json({ success: true, data: admin || { email: user.email } });
  },

  changePassword(req, res) {
    const user = getUserForToken(extractToken(req));
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

    const admin = db
      .prepare("SELECT email, password_hash, password_salt FROM admin_users WHERE email = ?")
      .get(user.email);
    if (!admin) {
      return res.status(404).json({ success: false, error: "Admin account not found." });
    }
    if (!verifyPassword(currentPassword, admin.password_salt, admin.password_hash)) {
      return res.status(401).json({ success: false, error: "Current password is incorrect." });
    }

    const { salt, hash } = hashPassword(newPassword);
    db.prepare("UPDATE admin_users SET password_hash = ?, password_salt = ? WHERE email = ?").run(
      hash,
      salt,
      admin.email,
    );

    // Revoke all other sessions so the new password takes effect immediately.
    db.prepare("DELETE FROM admin_sessions WHERE email = ? AND token <> ?").run(
      admin.email,
      extractToken(req),
    );

    return res.json({ success: true, message: "Password updated successfully." });
  },
};

export { hashPassword, createSession };
