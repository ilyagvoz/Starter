import { execSync } from "child_process";

async function dbSetup() {
  console.log("🔧 Setting up database...\n");

  try {
    // Step 1: Generate migrations
    console.log("📝 Step 1: Generating migrations...");
    execSync("pnpm db:generate", { stdio: "inherit" });
    console.log("✅ Migrations generated\n");

    // Step 2: Push migrations
    console.log("📝 Step 2: Applying migrations...");
    execSync("pnpm db:push", { stdio: "inherit" });
    console.log("✅ Migrations applied\n");

    console.log("═══════════════════════════════════════════════════════════");
    console.log("✅ Database setup complete!");
    console.log("═══════════════════════════════════════════════════════════\n");
    console.log("📋 What's next?");
    console.log("  1. Start the API:   pnpm dev");
    console.log("  2. In another terminal, start the web:   cd ../web && pnpm dev");
    console.log("  3. Visit:          http://localhost:5173\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting up database:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

dbSetup();
