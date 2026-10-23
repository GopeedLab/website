import { markdownResponse } from "@/lib/llms";
import { apiReferenceSource } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string; slug?: string[] }> },
) {
  const { lang, slug } = await params;
  return markdownResponse(lang, slug, true);
}

export function generateStaticParams() {
  return apiReferenceSource.generateParams();
}
