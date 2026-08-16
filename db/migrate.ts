import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath = (process.env.DATABASE_URL ?? "file:./dev.db").replace(/^file:/, "");
const migrationsDir = path.join(process.cwd(), "db", "migrations");

const sqlite = new Database(dbPath);
const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

for (const file of files) {
  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
  const statements = sql.split("--> statement-breakpoint");
  const applyAll = sqlite.transaction(() => {
    for (const stmt of statements) {
      const trimmed = stmt.trim();
      if (trimmed) sqlite.exec(trimmed);
    }
  });
  applyAll();
  console.log(`Uygulandı: ${file}`);
}

sqlite.close();
console.log("Migration tamamlandı.");
