import { notFound } from "next/navigation";
import { getPageImage, source } from "@/lib/source";

export const revalidate = false;

// All OG images are statically pre-generated via generateStaticParams.
// At runtime, any unknown slug returns 404 — no ImageResponse / next/og WASM needed.
export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  // Static pre-generation covers all pages; this path should never be reached at runtime.
  notFound();
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
