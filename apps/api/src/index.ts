import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema } from "@repo/shared";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get("/users", async (c) => {
  const allUsers = await db.select().from(users).all();
  return c.json(allUsers);
});

app.post("/users", zValidator("json", createUserSchema), async (c) => {
  const data = c.req.valid("json");
  const result = await db.insert(users).values(data).returning();
  return c.json(result[0], 201);
});

export default {
  port: 3111,
  fetch: app.fetch,
};

export type AppType = typeof app;
