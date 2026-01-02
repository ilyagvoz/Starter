import { describe, expect, it, beforeAll, beforeEach } from "bun:test";
import { join } from "path";
import { readdirSync, readFileSync } from "fs";
import { db, client } from "./db";
import { users } from "./db/schema";
import app from "./index";


// Setup: Run migrations on the in-memory DB before tests start
beforeAll(async () => {
  const drizzleDir = join(import.meta.dir, "../drizzle");
  const migrationFiles = readdirSync(drizzleDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of migrationFiles) {
    const migrationSql = readFileSync(join(drizzleDir, file), "utf-8");
    await client.executeMultiple(migrationSql);
  }
});

// Cleanup: Clear tables between tests for isolation
beforeEach(async () => {
  await db.delete(users);
});

describe("API Integration", () => {
  it("GET / should return hello message", async () => {
    const res = await app.fetch(new Request("http://localhost/"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ message: "Hello Hono!" });
  });

  describe("Auth Resource", () => {
    it("POST /auth/register should return 400 for invalid data", async () => {
      const res = await app.fetch(
        new Request("http://localhost/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "John" }), // missing email and password
        })
      );
      expect(res.status).toBe(400);
    });

    it("should successfully register, login, and fetch profile", async () => {
      const newUser = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      // 1. Register
      const registerRes = await app.fetch(
        new Request("http://localhost/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
      );
      expect(registerRes.status).toBe(201);
      const registerData = await registerRes.json();
      expect(registerData.token).toBeDefined();
      expect(registerData.user.email).toBe(newUser.email);
      expect(registerData.user.password).toBeUndefined();

      // 2. Login
      const loginRes = await app.fetch(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: newUser.email, password: newUser.password }),
        })
      );
      expect(loginRes.status).toBe(200);
      const loginData = await loginRes.json();
      expect(loginData.token).toBeDefined();

      // 3. Get Me
      const meRes = await app.fetch(
        new Request("http://localhost/auth/me", {
          headers: { "Authorization": `Bearer ${loginData.token}` },
        })
      );
      expect(meRes.status).toBe(200);
      const meData = await meRes.json();
      expect(meData.user.email).toBe(newUser.email);
    });
    
    it("POST /auth/login should fail with wrong password", async () => {
       // Create user first
       await app.fetch(
        new Request("http://localhost/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "User", email: "u@e.com", password: "password123" }),
        })
      );

      const res = await app.fetch(
        new Request("http://localhost/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "u@e.com", password: "wrong" }),
        })
      );
      expect(res.status).toBe(401);
    });
  });

  describe("Users Resource", () => {
    it("GET /users should return list of users without passwords", async () => {
      // 1. Create a user
      await app.fetch(
        new Request("http://localhost/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "User 1", email: "u1@e.com", password: "password123" }),
        })
      );

      // 2. Fetch users
      const res = await app.fetch(new Request("http://localhost/users"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.length).toBe(1);
      expect(data[0].name).toBe("User 1");
      expect(data[0].password).toBeUndefined();
    });
  });
});
