import { NextResponse } from "next/server";
import { getReleases } from "@/lib/cache";

const DEFAULT_PAGE_SIZE = 10;

export async function GET(request: Request) {
  const perPageParam = new URL(request.url).searchParams.get("per_page");
  const perPage =
    perPageParam === null ? DEFAULT_PAGE_SIZE : Number(perPageParam);

  if (!Number.isInteger(perPage) || perPage < 1 || perPage > 100) {
    return NextResponse.json(
      { error: "per_page must be an integer between 1 and 100" },
      { status: 400 },
    );
  }

  try {
    const data = await getReleases(perPage);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching releases:", error);
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 },
    );
  }
}
