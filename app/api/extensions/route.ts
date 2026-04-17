import { getCloudflareContext } from "@opennextjs/cloudflare";
import { asc, desc, like, or, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { extensions } from "@/db/schema";

// Note: No "edge" runtime here - drizzle-orm requires the SSR/Node.js bundling
// path that opennextjs-cloudflare handles via the handler.

const SORT_FIELDS = {
  stars: extensions.stars,
  installs: extensions.installCount,
  updated: extensions.updatedAt,
} as const;

type SortField = keyof typeof SORT_FIELDS;

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;
const DEFAULT_SORT: SortField = "installs";

/**
 * GET /api/extensions
 *
 * Query parameters:
 *   page    - Page number, 1-indexed (default: 1)
 *   limit   - Items per page, max 100 (default: 20)
 *   sort    - Sort field: "stars" | "installs" | "updated" (default: "installs")
 *   order   - Sort direction: "asc" | "desc" (default: "desc")
 *   q       - Optional search query (matches title, name, description, author)
 *
 * Response:
 *   {
 *     data: Extension[],
 *     pagination: {
 *       page: number,
 *       limit: number,
 *       total: number,
 *       totalPages: number,
 *       hasNext: boolean,
 *       hasPrev: boolean,
 *     }
 *   }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // --- Parse & validate params ---
    const page = Math.max(
      1,
      Number.parseInt(searchParams.get("page") ?? "1", 10) || 1,
    );
    const limit = Math.min(
      MAX_LIMIT,
      Math.max(
        1,
        Number.parseInt(
          searchParams.get("limit") ?? String(DEFAULT_LIMIT),
          10,
        ) || DEFAULT_LIMIT,
      ),
    );
    const offset = (page - 1) * limit;

    const sortParam = (searchParams.get("sort") ?? DEFAULT_SORT) as SortField;
    const sortField = SORT_FIELDS[sortParam] ?? SORT_FIELDS[DEFAULT_SORT];

    const orderParam = searchParams.get("order") ?? "desc";
    const orderFn = orderParam === "asc" ? asc : desc;

    const q = searchParams.get("q")?.trim() ?? "";

    // --- DB ---
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

    // Build optional search filter
    const whereClause = q
      ? or(
          like(extensions.title, `%${q}%`),
          like(extensions.name, `%${q}%`),
          like(extensions.description, `%${q}%`),
          like(extensions.author, `%${q}%`),
          like(extensions.repoFullName, `%${q}%`),
        )
      : undefined;

    // Count total matching rows
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(extensions)
      .where(whereClause);

    const total = Number(count);
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated data
    const data = await db
      .select()
      .from(extensions)
      .where(whereClause)
      .orderBy(orderFn(sortField))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("GET /api/extensions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch extensions" },
      { status: 500 },
    );
  }
}
