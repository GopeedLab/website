import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { syncExtensions } from "@/lib/store/fetcher";

// Note: No "edge" runtime here - drizzle-orm requires the SSR/Node.js bundling
// path that opennextjs-cloudflare handles via the handler. Using "edge" causes
// chunk files to be missing at runtime.

/**
 * POST /api/extensions/sync
 * Triggers background sync of gopeed extensions from GitHub.
 * Can be called by a cron job or manually.
 * Optionally accepts a GitHub token in the Authorization header for higher rate limits.
 */
export async function POST(request: NextRequest) {
  try {
    const ctx = await getCloudflareContext({ async: true });
    // @ts-expect-error - CF env type
    const d1 = ctx.env.DB as D1Database | undefined;

    if (!d1) {
      return NextResponse.json(
        { error: "D1 database not available" },
        { status: 503 },
      );
    }

    const db = getDb(d1);

    // Optionally use a GitHub token from the Authorization header
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;

    const stats = await syncExtensions(db, token);

    return NextResponse.json({ ok: true, stats });
  } catch (error) {
    console.error("Extension sync error:", error);
    return NextResponse.json(
      { error: "Sync failed", details: String(error) },
      { status: 500 },
    );
  }
}
