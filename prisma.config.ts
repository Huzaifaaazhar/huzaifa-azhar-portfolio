import { config } from "dotenv";
// The README has developers create `.env.local` (Next.js' convention), not
// the plain `.env` dotenv/config would load by default.
config({ path: ".env.local" });

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
