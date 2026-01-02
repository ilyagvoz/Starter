import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { registerSchema, loginSchema } from "@repo/shared";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { sign, verify } from "hono/jwt";

const app = new Hono();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

app.post("/register", zValidator("json", registerSchema), async (c) => {
  const { name, email, password } = c.req.valid("json");

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return c.json({ error: "User already exists" }, 400);
  }

  const hashedPassword = await Bun.password.hash(password);

  const result = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning();

  const user = result[0];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _dbPassword, ...userWithoutPassword } = user;

  const token = await sign({ id: user.id, email: user.email }, JWT_SECRET);

  return c.json({ user: userWithoutPassword, token }, 201);
});

app.post("/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const isMatch = await Bun.password.verify(password, user.password);
  if (!isMatch) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _dbPassword, ...userWithoutPassword } = user;
  const token = await sign({ id: user.id, email: user.email }, JWT_SECRET);

  return c.json({ user: userWithoutPassword, token });
});

app.get("/me", async (c) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = await verify(token, JWT_SECRET);
    const user = await db.query.users.findFirst({
      where: eq(users.email, payload.email as string),
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _dbPassword, ...userWithoutPassword } = user;
    return c.json({ user: userWithoutPassword });
  } catch {
    return c.json({ error: "Unauthorized" }, 401);
  }
});

export default app;
