import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reddottech_db",
    port: 3306,
  });

  await conn.execute(
    "UPDATE courses SET category = 'Artificial Intelligence' WHERE slug LIKE '%artificial-intelligence%' OR name LIKE '%Artificial Intelligence%'",
  );
  await conn.execute(
    "UPDATE courses SET category = 'Project Management' WHERE slug LIKE '%project-management%' OR name LIKE '%Project Management%'",
  );
  await conn.execute(
    "UPDATE courses SET category = 'Executive & Leadership' WHERE slug LIKE '%supervision%' OR name LIKE '%Supervision%' OR name LIKE '%Leadership%'",
  );
  await conn.execute(
    "UPDATE courses SET category = 'Analytics & Data' WHERE slug LIKE '%business-analytics%' OR name LIKE '%Business Analytics%'",
  );
  await conn.execute(
    "UPDATE courses SET category = 'Quality Management' WHERE slug LIKE '%six-sigma%' OR name LIKE '%Six Sigma%'",
  );

  const [rows] = await conn.execute("SELECT id, name, category, slug FROM courses");
  console.log("✅ Updated courses in DB:");
  console.log(rows);
  await conn.end();
}

main().catch(console.error);
