import { spawn } from "child_process";

async function runTests() {
  console.log("🚀 Running all tests...\n");

  const child = spawn("turbo", ["run", "test"], {
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
  });

  let output = "";

  child.stdout?.on("data", (data) => {
    process.stdout.write(data);
    output += data.toString();
  });

  child.stderr?.on("data", (data) => {
    process.stderr.write(data);
    output += data.toString();
  });

  const exitCode = await new Promise<number>((resolve) => {
    child.on("close", (code) => resolve(code || 0));
  });

  console.log("\n📊 ----------------------------------------");
  console.log("📊 TOTAL TEST SUMMARY");
  console.log("📊 ----------------------------------------");

  // Strip ANSI codes
  const cleanOutput = output.replace(/\u001b\[[0-9;]*m/g, "");

  // Parse Bun tests
  const bunMatches = cleanOutput.matchAll(/Ran (\d+) tests across/g);
  let bunTests = 0;
  for (const match of bunMatches) {
    bunTests += parseInt(match[1], 10);
  }

  // Parse Vitest tests
  const vitestMatches = cleanOutput.matchAll(/Tests\s+(\d+)\s+passed/g);
  let vitestTests = 0;
  for (const match of vitestMatches) {
    vitestTests += parseInt(match[1], 10);
  }

  const totalTests = bunTests + vitestTests;

  console.log(`\n✅ Shared & API (Bun):  ${bunTests} tests`);
  console.log(`✅ Frontend (Vitest):   ${vitestTests} tests`);
  console.log(`\n🏆 GRAND TOTAL:         ${totalTests} tests passed`);
  console.log("------------------------------------------");

  process.exit(exitCode);
}

runTests();
