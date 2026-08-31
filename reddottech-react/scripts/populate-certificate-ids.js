import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reddottech_db",
    port: 3306,
  });

  const [rows] = await conn.execute("SELECT id, name, track, certificate_id FROM certificates");
  console.log("Current certificates before update:", rows);

  for (const r of rows) {
    const track = (r.track || "foundations").toUpperCase();
    const certCode = r.certificate_id || `RDT-${track}-${r.id}`;
    await conn.execute("UPDATE certificates SET certificate_id = ? WHERE id = ?", [certCode, r.id]);
  }

  const [updated] = await conn.execute("SELECT id, name, track, certificate_id FROM certificates");
  console.log("✅ Updated certificates in DB:");
  console.log(updated);
  await conn.end();
}

main().catch(console.error);
