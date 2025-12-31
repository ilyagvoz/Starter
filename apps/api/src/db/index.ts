import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { env } from "../env";

const isTest = process.env.NODE_ENV === "test";

const url = isTest ? ":memory:" : env.DATABASE_URL;

export const client = createClient({
  url,
  authToken: isTest ? undefined : env.DATABASE_AUTH_TOKEN, // Optional: for remote Turso connection
});

export const db = drizzle(client, { schema });
