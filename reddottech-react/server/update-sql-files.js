import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function updateSqlFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");
  content = content.replace(
    /(\('course-1788413059055-7d47f17d'[\s\S]*?'beginner',\s*)'Professional Certification'/g,
    "$1'Web Development'"
  );
  content = content.replace(
    /(\('course-1788413832348-df86fdfd'[\s\S]*?'beginner',\s*)'Professional Certification'/g,
    "$1'Programming & Software'"
  );
  content = content.replace(
    /(\('course-1788414064703-bfd12496'[\s\S]*?'beginner',\s*)'Professional Certification'/g,
    "$1'Programming & Software'"
  );
  content = content.replace(
    /(\('course-1788414333268-fd078c76'[\s\S]*?'beginner',\s*)'Professional Certification'/g,
    "$1'Digital Marketing'"
  );
  fs.writeFileSync(filePath, content, "utf8");
  console.log("Updated category records in:", filePath);
}

updateSqlFile(path.resolve(__dirname, "schema.sql"));
updateSqlFile(path.resolve(__dirname, "../../brpgroup_reddot_db.sql"));
