import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const stagingDir = path.join(rootDir, ".cpanel-staging");
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

const deployItems = ["dist", "server", "public", "package.json", "package-lock.json", ".env.example"];
for (const item of deployItems) {
  const src = path.join(rootDir, item);
  const dest = path.join(stagingDir, item);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
  }
}

console.log("\n[3/4] Creating cpanel-deploy.zip archive...");
if (fs.existsSync(zipOutput)) {
  fs.unlinkSync(zipOutput);
}

try {
  const psCommand = `Get-ChildItem -Path .cpanel-staging\\* | Compress-Archive -DestinationPath cpanel-deploy.zip -Force`;
  execSync(`powershell.exe -NoProfile -Command "${psCommand}"`, {
    cwd: rootDir,
    stdio: "inherit",
  });

  // Clean staging
  fs.rmSync(stagingDir, { recursive: true, force: true });

  const stats = fs.statSync(zipOutput);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

  console.log("\n[4/4] SUCCESS!");
  console.log(`=================================================`);
  console.log(` Package Created : ${zipOutput}`);
  console.log(` File Size       : ${sizeMb} MB`);
  console.log(` Ready to Upload : Upload 'cpanel-deploy.zip' to cPanel!`);
  console.log(`=================================================`);
} catch (err) {
  console.error("Packaging error:", err);
  process.exit(1);
}
