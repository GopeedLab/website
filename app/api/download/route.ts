import { type NextRequest, NextResponse } from "next/server";
import { getLatestRelease } from "@/lib/cache";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tpl = searchParams.get("tpl");

  if (!tpl) {
    return NextResponse.json(
      { error: "Missing tpl parameter" },
      { status: 400 },
    );
  }

  try {
    const data = await getLatestRelease();
    // replace $version with version name
    const filename = tpl.replace("$version", data.tag_name);
    // redirect to download url
    return NextResponse.redirect(
      `https://github.com/GopeedLab/gopeed/releases/latest/download/${filename}`,
      { status: 302 },
    );
  } catch (error) {
    console.error("Error fetching release:", error);
    return NextResponse.json(
      { error: "Failed to fetch release" },
      { status: 500 },
    );
  }
}
