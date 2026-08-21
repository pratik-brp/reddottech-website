#!/usr/bin/env node
/*
 * Red Dot Technologies — AI for Healthcare Professionals
 * Build script: combines src/ + assets/ into one self-contained HTML file.
 *
 * Usage:   node build.js
 * Output:  dist/ai-for-healthcare-professionals.html
 *
 * Requires Node.js only. No npm install, no dependencies.
 */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src");
const ASSETS = path.join(ROOT, "assets");
const DIST = path.join(ROOT, "dist");
const OUTFILE = path.join(DIST, "ai-for-healthcare-professionals.html");

function read(p) {
  if (!fs.existsSync(p)) { console.error("MISSING FILE: " + p); process.exit(1); }
  return fs.readFileSync(p, "utf8");
}
function asDataUri(file) {
  const p = path.join(ASSETS, file);
  if (!fs.existsSync(p)) { console.error("MISSING ASSET: " + p); process.exit(1); }
  return "data:image/png;base64," + fs.readFileSync(p).toString("base64");
}

console.log("Building AI for Healthcare Professionals...\n");

let out = read(path.join(SRC, "index.template.html"));

const parts = {
  "{{STYLES}}":      read(path.join(SRC, "styles.css")),
  "{{COURSE_DATA}}": read(path.join(SRC, "course-data.js")),
  "{{CONFIG}}":      read(path.join(SRC, "config.js")),
  "{{APP_JS}}":      read(path.join(SRC, "app.js")),
  "{{LOGO_DARK}}":   asDataUri("logo-reddot.png"),
  "{{LOGO_WHITE}}":  asDataUri("logo-reddot-white.png"),
  "{{FONEPAY_QR}}":  asDataUri("fonepay-qr.png")
};

Object.keys(parts).forEach(token => {
  const count = out.split(token).length - 1;
  if (count === 0) console.warn("  ! token not found in template: " + token);
  out = out.split(token).join(parts[token]);
  console.log("  + " + token.padEnd(17) + " (" + count + " location" + (count === 1 ? "" : "s") + ")");
});

// safety checks
const leftover = out.match(/\{\{[A-Z_]+\}\}/g);
if (leftover) { console.error("\nERROR: unresolved tokens remain: " + [...new Set(leftover)].join(", ")); process.exit(1); }

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(OUTFILE, out);

const kb = Math.round(out.length / 1024);
console.log("\nBuilt: dist/ai-for-healthcare-professionals.html  (" + kb + " KB)");
console.log("Upload that single file to the web server. Nothing else is required.\n");
