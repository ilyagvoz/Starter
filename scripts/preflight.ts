import { spawn } from "child_process";

async function runCommand(
  command: string,
  args: string[],
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: ["inherit", "pipe", "pipe"],
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data) => {
      process.stdout.write(data);
      stdout += data.toString();
    });

    child.stderr?.on("data", (data) => {
      process.stderr.write(data);
      stderr += data.toString();
    });

    child.on("close", (code) => {
      resolve({ code: code || 0, stdout, stderr });
    });
  });
}

async function preflight() {
  console.log("🚀 Starting Preflight Checks...\n");

  // 1. Run Typecheck (Root & Turbo), Lint, Test
  console.log("📦 Running root typecheck...");
  const rootTypecheck = await runCommand("pnpm", ["typecheck"]);

  console.log("\n📦 Running Turbo tasks (typecheck, lint, test)...");
  const turboResult = await runCommand("npx", [
    "turbo",
    "run",
    "typecheck",
    "lint",
    "test",
    "--continue",
  ]);

  // 2. Run Prettier
  console.log("\n🧹 Formatting code...");
  const prettierResult = await runCommand("npx", [
    "prettier",
    "--write",
    '"**/*.{ts,tsx,md}"',
  ]);

  console.log("\n📊 ----------------------------------------");
  console.log("📊 PREFLIGHT SUMMARY");
  console.log("📊 ----------------------------------------");

  // Filter Prettier output
  const prettierLines = prettierResult.stdout.split("\n");
  const modifiedFiles = prettierLines.filter(
    (line) => line.includes("ms") && !line.includes("(unchanged)"),
  );

  if (modifiedFiles.length > 0) {
    console.log("\n✨ Formatted Files:");
    modifiedFiles.forEach((file) => {
      if (file.trim()) console.log(`   ${file.trim()}`);
    });
  } else {
    console.log("\n✨ No files needed formatting.");
  }

  // Parse Results
  const cleanOutput = (turboResult.stdout + turboResult.stderr).replace(
    /\u001b\[[0-9;]*m/g,
    "",
  );

  // Tests Summary
  const bunMatches = Array.from(
    cleanOutput.matchAll(/Ran (\d+) tests across/g),
  );
  let bunTests = 0;
  for (const match of bunMatches) bunTests += parseInt(match[1], 10);

  const vitestMatches = Array.from(
    cleanOutput.matchAll(/Tests\s+(\d+)\s+passed/g),
  );
  let vitestTests = 0;
  for (const match of vitestMatches) vitestTests += parseInt(match[1], 10);

  console.log(
    `\n✅ Tests: ${bunTests + vitestTests} passed (${bunTests} Bun, ${vitestTests} Vitest)`,
  );

  if (turboResult.code === 0 && rootTypecheck.code === 0) {
    console.log("✅ Linting: All checks passed");
    console.log("✅ Typecheck: All checks passed");
  } else {
    if (rootTypecheck.code !== 0)
      console.log("❌ Root scripts typecheck failed.");
    if (turboResult.code !== 0) console.log("❌ Workspace Turbo tasks failed.");
    console.log("❌ Some checks failed. See output above for details.");
  }

  console.log("\n🏆 Preflight Complete!");
  console.log("------------------------------------------");

  process.exit(turboResult.code || rootTypecheck.code);
}

preflight();
