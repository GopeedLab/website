import { parseExtensionListParams } from "./list-params";

type ResponseCache = Pick<Cache, "match" | "put">;
type ExecutionContext = { waitUntil(promise: Promise<unknown>): void };

export function extensionCachePolicy(request: Request) {
  if (request.method !== "GET" || request.headers.has("authorization")) {
    return undefined;
  }

  const url = new URL(request.url);
  const key = new URL(url.origin);
  // Bump this namespace when the API representation changes.
  key.pathname = `/__extension_response_cache/v1${url.pathname}`;

  if (url.pathname === "/api/extensions") {
    const params = parseExtensionListParams(url.searchParams);
    for (const [name, value] of Object.entries(params)) {
      key.searchParams.set(name, String(value));
    }
    return { key: new Request(key), ttl: 600 };
  }

  if (
    /^\/api\/extensions\/[^/]+$/.test(url.pathname) &&
    !["/api/extensions/install", "/api/extensions/sync"].includes(url.pathname)
  ) {
    // A newly published version must not reuse the previous detail response.
    const version = url.searchParams.get("version");
    if (version) key.searchParams.set("version", version);
    return { key: new Request(key), ttl: 1800 };
  }

  return undefined;
}

export async function withExtensionResponseCache(
  request: Request,
  ctx: ExecutionContext,
  fetchResponse: () => Promise<Response>,
  cache: ResponseCache,
): Promise<Response> {
  const policy = extensionCachePolicy(request);
  if (!policy) return fetchResponse();

  // Cache availability must not determine API availability.
  const cached = await cache.match(policy.key).catch(() => undefined);
  if (cached) {
    const response = new Response(cached.body, cached);
    response.headers.set(
      "Cache-Control",
      `public, max-age=60, s-maxage=${policy.ttl}`,
    );
    response.headers.set("X-Gopeed-Cache", "HIT");
    return response;
  }

  const upstream = await fetchResponse();
  if (
    upstream.status !== 200 ||
    upstream.headers.has("set-cookie") ||
    !upstream.headers.get("content-type")?.includes("application/json") ||
    /private|no-store/i.test(upstream.headers.get("cache-control") ?? "")
  ) {
    return upstream;
  }

  const response = new Response(upstream.body, upstream);
  response.headers.set(
    "Cache-Control",
    `public, max-age=60, s-maxage=${policy.ttl}`,
  );
  // These public JSON endpoints do not vary with Next.js navigation headers.
  response.headers.delete("Vary");
  const stored = response.clone();
  stored.headers.set("Cache-Control", `public, max-age=${policy.ttl}`);
  // Browser freshness remains shorter than the regional edge-cache lifetime.
  ctx.waitUntil(cache.put(policy.key, stored).catch(() => {}));
  response.headers.set("X-Gopeed-Cache", "MISS");
  return response;
}
