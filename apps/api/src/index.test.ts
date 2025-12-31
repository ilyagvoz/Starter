import { describe, expect, it, beforeAll, beforeEach } from "bun:test";
import { join } from "path";
import { readFileSync } from "fs";
import { eq, sql } from "drizzle-orm";
import { db, client } from "./db";
import { users } from "./db/schema";
import app from "./index";

// Setup: Run migrations on the in-memory DB before tests start
beforeAll(async () => {
  const migrationPath = join(import.meta.dir, "../drizzle/0000_happy_iron_patriot.sql");
  const migrationSql = readFileSync(migrationPath, "utf-8");
  await client.execute(migrationSql);
});

// Cleanup: Clear tables between tests for isolation
beforeEach(async () => {
  await db.run(sql`DELETE FROM users`);
});

describe("API Integration", () => {
  it("GET / should return hello message", async () => {
    const res = await app.fetch(new Request("http://localhost/"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ message: "Hello Hono!" });
  });

  describe("Users Resource", () => {
    it("GET /users should return an empty list initially", async () => {
      const res = await app.fetch(new Request("http://localhost/users"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toEqual([]);
    });

    it("POST /users should return 400 for invalid data", async () => {
      const res = await app.fetch(
        new Request("http://localhost/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "John" }), // missing email
        })
      );
      expect(res.status).toBe(400);
    });

    it("should successfully create a user and then retrieve them", async () => {
      const newUser = {
        name: "Test User",
        email: "test@example.com",
      };

      // 1. Create the user
      const postRes = await app.fetch(
        new Request("http://localhost/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
      );
      expect(postRes.status).toBe(201);

      // 2. Retrieve all users
      const getRes = await app.fetch(new Request("http://localhost/users"));
      expect(getRes.status).toBe(200);
      
      const allUsers = (await getRes.json()) as any[];
      expect(allUsers.length).toBe(1);
      expect(allUsers[0].name).toBe(newUser.name);
      expect(allUsers[0].email).toBe(newUser.email);
    });
  });
});
