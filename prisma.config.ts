import { config } from "dotenv";
// The README has developers create `.env.local` (Next.js' convention), not
// the plain `.env` dotenv/config would load by default.
config({ path: ".env.local" });

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // `prisma generate` only reads the schema — it never opens a DB
    // connection — so a plain env lookup (not prisma/config's `env()`,
    // which throws when unresolved) keeps builds working in environments
    // that don't have DATABASE_URL set yet.
    url: process.env.DATABASE_URL,
  },
});
