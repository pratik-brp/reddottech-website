import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const coursesJsonPath = path.join(rootDir, "server/data/ai-courses/courses.json");
const courses = JSON.parse(fs.readFileSync(coursesJsonPath, "utf8"));

const createTsContent = (varName, data) => {
  return `export interface Section {
  h: string;
  html: string;
}

export interface QuizItem {
  q: string;
  opts: string[];
  a: number;
  fb: string;
}

export interface Lesson {
  id: string;
  tag: string;
  time: string;
  title: string;
  summary: string;
  objectives: string[];
  sections: Section[];
  practitioner?: { title: string; text: string };
  activity: { title: string; text: string };
  takeaways: string[];
  quiz: QuizItem[];
}

export const ${varName}: Lesson[] = ${JSON.stringify(data, null, 2)};
`;
};

fs.writeFileSync(
  path.join(rootDir, "src/data/ai-healthcare-data.ts"),
  createTsContent("healthcareLessons", courses.healthcare),
  "utf8"
);
fs.writeFileSync(
  path.join(rootDir, "src/data/ai-finance-data.ts"),
  createTsContent("financeLessons", courses.finance),
  "utf8"
);
fs.writeFileSync(
  path.join(rootDir, "src/data/ai-finance-advanced-data.ts"),
  createTsContent("financeAdvancedLessons", courses["finance-advanced"]),
  "utf8"
);
fs.writeFileSync(
  path.join(rootDir, "src/data/ai-foundations-data.ts"),
  createTsContent("foundationsLessons", courses.foundations),
  "utf8"
);
fs.writeFileSync(
  path.join(rootDir, "src/data/ai-education-data.ts"),
  createTsContent("educationLessons", courses.education),
  "utf8"
);
fs.writeFileSync(
  path.join(rootDir, "src/data/ai-management-data.ts"),
  createTsContent("managementLessons", courses.management),
  "utf8"
);
fs.writeFileSync(
  path.join(rootDir, "src/data/ai-agile-developers-data.ts"),
  createTsContent("agileDevelopersLessons", courses["agile-developers"]),
  "utf8"
);
fs.writeFileSync(
  path.join(rootDir, "src/data/ai-agile-managers-data.ts"),
  createTsContent("agileManagersLessons", courses["agile-managers"]),
  "utf8"
);

console.log("✅ Successfully synchronized all complete course data into src/data/*.ts!");
