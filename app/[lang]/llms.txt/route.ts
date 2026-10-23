import { notFound } from "next/navigation";
import { type Locale, locales } from "@/lib/i18n";
import { siteLlms } from "@/lib/source";

export const revalidate = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  return new Response(siteLlms.index(lang), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Language": lang,
      "X-Robots-Tag": "noindex",
    },
  });
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
