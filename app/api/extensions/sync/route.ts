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
 *
 * Body:
 *   token?    - GitHub personal access token (for 5000 req/hr vs 60 req/hr)
 *   page?     - 1-based page of repos to process (default: 1)
 *   pageSize? - number of repos per page (default: 10, max: 10)
 *
 * Response includes `hasMore: true` when there are more pages to process.
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

    const body = (await request.json().catch(() => ({}))) as {
      token?: string;
      page?: number;
      pageSize?: number;
    };
    const token = typeof body.token === "string" ? body.token : undefined;
    const page =
      typeof body.page === "number" && body.page >= 1
        ? Math.floor(body.page)
        : 1;
    // Each repo costs ~3 subrequests (Contents API + Commits API + raw manifest).
    // Cloudflare Workers limit: 50 subrequests per request.
    // 1 (GitHub search) + 10 repos × 3 = 31 — leaves headroom for multi-dir repos.
    // Hard cap at 10 to stay safely under the limit.
    const pageSize =
      typeof body.pageSize === "number"
        ? Math.min(10, Math.max(1, Math.floor(body.pageSize)))
        : 10;

    const stats = await syncExtensions(db, token, page, pageSize);

    return NextResponse.json({ ok: true, stats });
  } catch (error) {
    console.error("Extension sync error:", error);
    return NextResponse.json(
      { error: "Sync failed", details: String(error) },
      { status: 500 },
    );
  }
}
