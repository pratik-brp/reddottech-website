import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const edAppPath = "C:/Users/acer/.gemini/antigravity-ide/brain/e4c29452-5ef6-498e-bc68-ed77087353ef/scratch/education/reddot-ai-education 2/src/app.js";
const mgAppPath = "C:/Users/acer/.gemini/antigravity-ide/brain/e4c29452-5ef6-498e-bc68-ed77087353ef/scratch/management/reddot-ai-management 2/src/app.js";

const edApp = fs.readFileSync(edAppPath, "utf8");
const mgApp = fs.readFileSync(mgAppPath, "utf8");

const edFigMatch = edApp.match(/const FIG\s*=\s*\{([\s\S]*?)\n\};/);
const mgFigMatch = mgApp.match(/const FIG\s*=\s*\{([\s\S]*?)\n\};/);

if (!edFigMatch || !mgFigMatch) {
  console.error("FIG not found");
  process.exit(1);
}

const content = `// SVG Diagrams for AI for Teachers & Educators and AI for Management Professionals
/* eslint-disable */

export const EDUCATION_FIG: Record<string, () => string> = {${edFigMatch[1]}
};

export const MANAGEMENT_FIG: Record<string, () => string> = {${mgFigMatch[1]}
};

export function renderEducationDiagram(id: string): string {
  if (EDUCATION_FIG[id]) {
    return EDUCATION_FIG[id]();
  }
  return "";
}

export function renderManagementDiagram(id: string): string {
  if (MANAGEMENT_FIG[id]) {
    return MANAGEMENT_FIG[id]();
  }
  return "";
}
`;

fs.writeFileSync(path.join(rootDir, "src/lib/ai-course-diagrams-extra.ts"), content, "utf8");
console.log("Successfully wrote src/lib/ai-course-diagrams-extra.ts!");
