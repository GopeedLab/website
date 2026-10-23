import { markdownResponse } from "@/lib/llms";
import { source } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang?: string; slug?: string[] }> },
) {
  const { slug, lang = "en" } = await params;
  return markdownResponse(lang, slug);
}

export function generateStaticParams() {
  return source.generateParams().filter((page) => page.lang === "en");
}
