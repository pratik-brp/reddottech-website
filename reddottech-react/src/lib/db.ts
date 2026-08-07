import Database from "better-sqlite3";
import path from "path";

// Initialize SQLite database instance pointing to /database/database.sqlite
const dbPath = path.resolve(process.cwd(), "database/database.sqlite");

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(dbPath, {
      verbose: process.env.NODE_ENV === "development" ? console.log : undefined,
    });
    dbInstance.pragma("journal_mode = WAL");
  }
  return dbInstance;
}

// Interfaces based on database schema
export interface Course {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: string;
  original_price: string;
  duration: string;
  mode: string;
  partner: string;
  description: string;
  overview: string;
  syllabus: string;
  instructor_name: string;
  instructor_title: string;
  instructor_image: string;
  instructor_detail: string;
  requirements: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

export interface Certificate {
  id: number;
  name: string;
  email: string;
  school: string;
  completed_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface Setting {
  id: number;
  key: string;
  value: string;
}

// Data Access Helpers
export function getAllCourses(): Course[] {
  const db = getDb();
  return db.prepare("SELECT * FROM courses ORDER BY id ASC").all() as Course[];
}

export function getCourseBySlug(slug: string): Course | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM courses WHERE slug = ? OR id = ?").get(slug, slug) as
    Course | undefined;
}

export function createContactMessage(input: ContactInput) {
  const db = getDb();
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const stmt = db.prepare(`
    INSERT INTO contacts (first_name, last_name, email, phone, subject, message, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    input.first_name,
    input.last_name,
    input.email,
    input.phone,
    input.subject || "General Inquiry",
    input.message,
    now,
    now,
  );
}

export function createSubscription(email: string) {
  const db = getDb();
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const existing = db.prepare("SELECT id FROM subscriptions WHERE email = ?").get(email);
  if (existing) return existing;

  const stmt = db.prepare(
    "INSERT INTO subscriptions (email, created_at, updated_at) VALUES (?, ?, ?)",
  );
  return stmt.run(email, now, now);
}

export function createCertificate(name: string, email: string, school: string) {
  const db = getDb();
  const now = new Date().toISOString().slice(0, 19).replace("T", " ");
  const stmt = db.prepare(`
    INSERT INTO certificates (name, email, school, completed_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(name, email, school, now, now, now);
}

export function getCertificateById(id: number): Certificate | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM certificates WHERE id = ?").get(id) as Certificate | undefined;
}

export function getSettingsMap(): Record<string, string> {
  const db = getDb();
  const rows = db.prepare("SELECT key, value FROM settings").all() as {
    key: string;
    value: string;
  }[];
  const map: Record<string, string> = {};
  rows.forEach((r) => {
    map[r.key] = r.value;
  });
  return map;
}
