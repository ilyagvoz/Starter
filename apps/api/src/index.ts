import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { db } from "./db";
import { users } from "./db/schema";
import auth from "./routes/auth";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app.route("/auth", auth);

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get("/users", async (c) => {
  const allUsers = await db.query.users.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    }
  });
  return c.json(allUsers);
});

export default {
  port: 3111,
  fetch: app.fetch,
};

export type AppType = typeof app;
