import { db } from "./index";
import { users } from "./schema";

const sampleUsers = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
  },
  {
    name: "Evan Wright",
    email: "evan@example.com",
  },
];

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    await db.insert(users).values(sampleUsers);
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
