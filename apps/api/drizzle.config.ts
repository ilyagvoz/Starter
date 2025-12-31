import type { Config } from "drizzle-kit";

const isRemote = process.env.DATABASE_URL?.startsWith("http");

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  ...(isRemote
    ? {
        driver: "turso",
        dbCredentials: {
          url: process.env.DATABASE_URL || "file:local.db",
          authToken: process.env.DATABASE_AUTH_TOKEN,
        },
      }
    : {
        dbCredentials: {
          url: process.env.DATABASE_URL || "file:local.db",
        },
      }),
} satisfies Config;
