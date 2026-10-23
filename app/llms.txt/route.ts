import { siteLlms } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  return new Response(siteLlms.index("en"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
