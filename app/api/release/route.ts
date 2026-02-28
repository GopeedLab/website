import { NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/cache";

export async function GET() {
  try {
    const data = await getLatestRelease();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching release:", error);
    return NextResponse.json(
      { error: "Failed to fetch release" },
      { status: 500 },
    );
  }
}
