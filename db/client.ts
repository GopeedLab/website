import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

/**
 * Get a Drizzle D1 database instance.
 * Pass the D1Database binding from Cloudflare Workers env.
 */
export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

export type Db = ReturnType<typeof getDb>;
