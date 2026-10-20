function publicExtensionMethods(pathname: string): string | undefined {
  if (pathname === "/api/extensions/install") return "POST, OPTIONS";
  if (pathname === "/api/extensions") return "GET, OPTIONS";
  if (
    /^\/api\/extensions\/[^/]+$/.test(pathname) &&
    pathname !== "/api/extensions/sync"
  ) {
    return "GET, OPTIONS";
  }
  return undefined;
}

// Apply outside the response cache so existing cache hits and errors also carry
// CORS headers. These public endpoints do not use browser credentials.
export async function withExtensionCors(
  request: Request,
  fetchResponse: () => Promise<Response>,
): Promise<Response> {
  let pathname: string;
  try {
    pathname = decodeURIComponent(new URL(request.url).pathname);
  } catch {
    return fetchResponse();
  }
  const methods = publicExtensionMethods(pathname);
  if (!methods) return fetchResponse();

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const upstream = await fetchResponse();
  const response = new Response(upstream.body, upstream);
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
}
