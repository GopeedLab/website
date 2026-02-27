import type { Config } from "drizzle-kit";

// export default {
//   schema: "./db/schema.ts",
//   out: "./db/migrations",
//   dialect: "sqlite",
//   driver: "d1-http",
// } satisfies Config;

export default process.env.LOCAL_DB_PATH
  ? ({
      schema: "./db/schema.ts",
      dialect: "sqlite",
      dbCredentials: {
        url: process.env.LOCAL_DB_PATH!,
      },
    } satisfies Config)
  : ({
      schema: "./db/schema.ts",
      out: "./db/migrations",
      dialect: "sqlite",
      driver: "d1-http",
    } satisfies Config);
