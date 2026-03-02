import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { extensions } from "@/db/schema";

// Note: No "edge" runtime here - drizzle-orm requires the SSR/Node.js bundling
// path that opennextjs-cloudflare handles via the handler.

/**
 * POST /api/extensions/install
 * Body: { id: string }
 * Increments the install count for an extension.
 * Called from the frontend when a user clicks "Install".
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { id?: string };
    const id = body?.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Missing extension id" },
        { status: 400 },
      );
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

    await db
      .update(extensions)
      .set({
        installCount: sql`${extensions.installCount} + 1`,
      })
      .where(eq(extensions.id, id));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Install tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track install" },
      { status: 500 },
    );
  }
}
