import { execSync } from "child_process";
import { readdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";

async function dbPush() {
  console.log("🚀 Pushing database migrations...");

  try {
    // Find all migration files
    const drizzleDir = join(process.cwd(), "drizzle");
    let files = readdirSync(drizzleDir).filter(
      (f) => f.endsWith(".sql") && !f.includes("meta")
    );

    if (files.length === 0) {
      console.log("✅ No migrations to apply");
      process.exit(0);
    }

    // Sort migrations by filename (they're named with numbers)
    files = files.sort();
    const dbPath = join(process.cwd(), "local.db");

    // Check if database exists, if not create it
    if (!existsSync(dbPath)) {
      console.log("📦 Creating database...");
      execSync(`touch ${dbPath}`);
    }

    // Apply latest migration (should contain all schema from previous ones)
    const latestMigration = files[files.length - 1];
    const migrationPath = join(drizzleDir, latestMigration);

    console.log(`📝 Applying migration: ${latestMigration}`);

    // Apply migration
    execSync(`sqlite3 ${dbPath} < ${migrationPath}`, { stdio: "inherit" });

    console.log("✅ Database migrations applied successfully!");
    console.log(`📊 Database location: ${dbPath}`);

    // Show table count
    try {
      const tableCount = execSync(`sqlite3 ${dbPath} "SELECT COUNT(*) FROM sqlite_master WHERE type='table';"`, {
        encoding: "utf-8",
      }).trim();
      const tables = execSync(`sqlite3 ${dbPath} ".tables"`, {
        encoding: "utf-8",
      }).trim();
      console.log(`📋 Tables created: ${tableCount}`);
      console.log(`📋 Tables: ${tables}`);
    } catch (e) {
      // Ignore if can't count tables
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error applying migrations:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

dbPush();
