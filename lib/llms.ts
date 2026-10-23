import { notFound } from "next/navigation";
import { i18n, type Locale } from "@/lib/i18n";
import {
  apiReferenceLlms,
  apiReferenceSource,
  docsLlms,
  source,
} from "@/lib/source";

export async function markdownResponse(
  lang: string,
  slug?: string[],
  api = false,
) {
  if (!i18n.languages.includes(lang as Locale)) notFound();
  // Preserve old direct /llms.mdx/.../docs/openapi URLs as well as public .mdx links.
  if (!api && slug?.[0] === "openapi") {
    api = true;
    slug = slug.slice(1);
  }
  const slugs = slug?.at(-1) === "index" ? slug.slice(0, -1) : slug;
  const page = (api ? apiReferenceSource : source).getPage(slugs, lang);
  if (!page) notFound();
  return new Response(await (api ? apiReferenceLlms : docsLlms).page(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": lang,
      "X-Robots-Tag": "noindex",
    },
  });
}
