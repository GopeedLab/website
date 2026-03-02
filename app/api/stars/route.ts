import { NextResponse } from "next/server";
import { getRepoInfo } from "@/lib/cache";

export async function GET() {
  try {
    const repo = await getRepoInfo();

    return NextResponse.json(
      {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        formatted: formatStars(repo.stargazers_count),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching repo info:", error);
    return NextResponse.json(
      { error: "Failed to fetch repository info" },
      { status: 500 },
    );
  }
}

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}
