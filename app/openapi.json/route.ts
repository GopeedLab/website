import schema from "@/lib/openapi/swagger.json";

export const dynamic = "force-static";

export function GET() {
  return Response.json(schema, { headers: { "X-Robots-Tag": "noindex" } });
}
