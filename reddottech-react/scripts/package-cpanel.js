import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const stagingDir = path.join(rootDir, ".cpanel-staging");
const tarOutput = path.join(rootDir, "cpanel-deploy.tar.gz");
const zipOutput = path.join(rootDir, "cpanel-deploy.zip");

console.log("=================================================");
console.log("  Red Dot Technologies — cPanel Deployment Packager");
console.log("=================================================");

console.log("\n[1/4] Building production bundle (vite build)...");
execSync("npm run build", { cwd: rootDir, stdio: "inherit" });

console.log("\n[2/4] Preparing staging directory...");
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const deployItems = ["dist", "server", "public", ".env.example"];
for (const item of deployItems) {
  const src = path.join(rootDir, item);
  const dest = path.join(stagingDir, item);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
  }
}

// Generate clean production package.json containing all production runtime dependencies (react, tanstack, express, etc.)
const mainPkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
const prodPackageJson = {
  name: mainPkg.name || "reddottech",
  version: mainPkg.version || "1.0.0",
  private: true,
  type: "module",
  scripts: {
    start: "node server/prod-entry.js",
  },
  dependencies: mainPkg.dependencies,
};
fs.writeFileSync(
  path.join(stagingDir, "package.json"),
  JSON.stringify(prodPackageJson, null, 2),
  "utf8"
);

// Ensure private storage directories exist
fs.mkdirSync(path.join(stagingDir, "storage/receipts"), { recursive: true });

// Ensure .htaccess exists so CloudLinux Node.js selector (cl_selector.py) never throws FileNotFoundError
fs.writeFileSync(path.join(stagingDir, ".htaccess"), "", "utf8");


console.log("\n[3/4] Creating deployment archives...");

// 1. Create cpanel-deploy.tar.gz (Recommended: avoids Sanesecurity Foxhole JS_Zip antivirus false positives)
let hasTarGz = false;
try {
  if (fs.existsSync(tarOutput)) {
    fs.unlinkSync(tarOutput);
  }
  execSync(`tar -czf "${tarOutput}" -C "${stagingDir}" .`, {
    cwd: rootDir,
    stdio: "inherit",
  });
  hasTarGz = true;
} catch (err) {
  console.warn("tar.gz creation warning:", err.message);
}

// 2. Create cpanel-deploy.zip as well (using tar zip support)
let hasZip = false;
try {
  if (fs.existsSync(zipOutput)) {
    fs.unlinkSync(zipOutput);
  }
  execSync(`tar -acf "${zipOutput}" -C "${stagingDir}" .`, {
    cwd: rootDir,
    stdio: "inherit",
  });
  hasZip = true;
} catch (err) {
  console.warn("zip creation warning:", err.message);
}

// Clean staging
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}

console.log("\n[4/4] PACKAGING COMPLETED!");
console.log("=================================================");
if (hasTarGz) {
  const tarStats = fs.statSync(tarOutput);
  const tarMb = (tarStats.size / (1024 * 1024)).toFixed(2);
  console.log(` ⭐ RECOMMENDED ARCHIVE: cpanel-deploy.tar.gz (${tarMb} MB)`);
  console.log(`    Location: ${tarOutput}`);
  console.log(`    👉 Use this for cPanel File Manager upload to bypass Foxhole.JS_Zip antivirus false positives!`);
}
if (hasZip) {
  const zipStats = fs.statSync(zipOutput);
  const zipMb = (zipStats.size / (1024 * 1024)).toFixed(2);
  console.log(` 📦 ZIP ARCHIVE         : cpanel-deploy.zip (${zipMb} MB)`);
  console.log(`    Location: ${zipOutput}`);
}
console.log("=================================================");

