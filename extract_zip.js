const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const zipPath = path.resolve(__dirname, 'reddot-ai-finance-advanced-20260821T045555Z-1-001.zip');
console.log('Zip exists:', fs.existsSync(zipPath), zipPath);
const dest = path.resolve(__dirname, 'extracted_finance_advanced');
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

try {
  execSync(`powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${dest}' -Force"`, { stdio: 'inherit' });
  console.log('Successfully expanded archive!');
  
  function list(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const p = path.join(dir, item);
      const st = fs.statSync(p);
      if (st.isDirectory()) {
        console.log('[DIR]', path.relative(dest, p));
        list(p);
      } else {
        console.log('[FILE]', path.relative(dest, p), '(' + st.size + ' bytes)');
      }
    }
  }
  list(dest);
} catch (e) {
  console.error('Error:', e.message);
}
