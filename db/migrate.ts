import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath = (process.env.DATABASE_URL ?? "file:./dev.db").replace(/^file:/, "");
const migrationsDir = path.join(process.cwd(), "db", "migrations");

const sqlite = new Database(dbPath);
sqlite.exec(
  "CREATE TABLE IF NOT EXISTS `_applied_migrations` (`file` text PRIMARY KEY, `applied_at` text DEFAULT (current_timestamp) NOT NULL);"
);
const applied = new Set(
  sqlite.prepare("SELECT file FROM `_applied_migrations`").all().map((r: any) => r.file)
);

const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

for (const file of files) {
  if (applied.has(file)) {
    console.log(`Zaten uygulanmış, atlandı: ${file}`);
    continue;
  }
  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
  const statements = sql.split("--> statement-breakpoint");
  const applyAll = sqlite.transaction(() => {
    for (const stmt of statements) {
      const trimmed = stmt.trim();
      if (trimmed) sqlite.exec(trimmed);
    }
    sqlite.prepare("INSERT INTO `_applied_migrations` (file) VALUES (?)").run(file);
  });
  applyAll();
  console.log(`Uygulandı: ${file}`);
}

sqlite.close();
console.log("Migration tamamlandı.");
