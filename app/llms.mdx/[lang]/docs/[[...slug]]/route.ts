export { GET } from "@/app/llms.mdx/docs/[[...slug]]/route";

export const revalidate = false;

import { source } from "@/lib/source";

export function generateStaticParams() {
  return source.generateParams();
}
