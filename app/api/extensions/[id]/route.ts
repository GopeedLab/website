import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { extensions } from "@/db/schema";

/**
 * GET /api/extensions/[id]
 *
 * Fetch a single extension by its ID (e.g. "author@name").
 *
 * Response: Extension object or 404
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: rawId } = await params;
    const id = decodeURIComponent(rawId);

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

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

    const extension = await db
      .select()
      .from(extensions)
      .where(eq(extensions.id, id))
      .get();

    if (!extension) {
      return NextResponse.json(
        { error: "Extension not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(extension);
  } catch (error) {
    console.error("GET /api/extensions/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch extension" },
      { status: 500 },
    );
  }
}
