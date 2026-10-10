import assert from "node:assert/strict";
import test from "node:test";
import {
  extensionCachePolicy,
  withExtensionResponseCache,
} from "./response-cache";

function harness() {
  const entries = new Map<string, Response>();
  const writes: Promise<unknown>[] = [];
  const cache: Parameters<typeof withExtensionResponseCache>[3] = {
    async match(request) {
      const key =
        typeof request === "string"
          ? request
          : request instanceof URL
            ? request.href
            : request.url;
      return entries.get(key)?.clone();
    },
    async put(request, response) {
      const key =
        typeof request === "string"
          ? request
          : request instanceof URL
            ? request.href
            : request.url;
      entries.set(key, response.clone());
    },
  };
  return {
    cache,
    ctx: { waitUntil: (promise: Promise<unknown>) => writes.push(promise) },
    flush: () => Promise.all(writes),
    entries,
  };
}

const request = (path: string, init?: RequestInit) =>
  new Request(`https://gopeed.com${path}`, init);

test("normalizes equivalent queries and keeps legacy/summary keys separate", () => {
  const legacy = extensionCachePolicy(request("/api/extensions"));
  const explicit = extensionCachePolicy(
    request(
      "/api/extensions?order=desc&page=1&limit=20&sort=installs&ignored=x",
    ),
  );
  assert.equal(legacy?.key.url, explicit?.key.url);
  assert.notEqual(
    legacy?.key.url,
    extensionCachePolicy(request("/api/extensions?view=summary"))?.key.url,
  );
  assert.equal(
    legacy?.key.url,
    extensionCachePolicy(request("/api/extensions?view=unknown"))?.key.url,
  );
  assert.equal(
    extensionCachePolicy(request("/api/extensions?q=%20test%20&sort=__proto__"))
      ?.key.url,
    extensionCachePolicy(request("/api/extensions?q=test&sort=installs"))?.key
      .url,
  );
});

test("a new extension version uses a fresh detail key", () => {
  assert.notEqual(
    extensionCachePolicy(request("/api/extensions/author%40name?version=1"))
      ?.key.url,
    extensionCachePolicy(request("/api/extensions/author%40name?version=2"))
      ?.key.url,
  );
});

test("cache hits skip the handler and preserve browser freshness", async () => {
  const h = harness();
  let calls = 0;
  const handler = async () => {
    calls++;
    return Response.json(
      { data: [{ id: "author@name", readme: "README" }] },
      {
        headers: { Vary: "rsc, next-router-state-tree" },
      },
    );
  };
  const first = await withExtensionResponseCache(
    request("/api/extensions"),
    h.ctx,
    handler,
    h.cache,
  );
  await h.flush();
  assert.equal(first.headers.get("X-Gopeed-Cache"), "MISS");
  const second = await withExtensionResponseCache(
    request("/api/extensions"),
    h.ctx,
    handler,
    h.cache,
  );
  assert.equal(second.headers.get("X-Gopeed-Cache"), "HIT");
  assert.equal(
    second.headers.get("Cache-Control"),
    "public, max-age=60, s-maxage=600",
  );
  assert.equal(second.headers.get("Vary"), null);
  assert.deepEqual(await second.json(), {
    data: [{ id: "author@name", readme: "README" }],
  });
  assert.equal(calls, 1);
});

test("summary requests cannot reuse a full response", async () => {
  const h = harness();
  await withExtensionResponseCache(
    request("/api/extensions"),
    h.ctx,
    async () => Response.json({ data: [{ readme: "legacy" }] }),
    h.cache,
  );
  await h.flush();
  const summary = await withExtensionResponseCache(
    request("/api/extensions?view=summary"),
    h.ctx,
    async () => Response.json({ data: [{ id: "summary" }] }),
    h.cache,
  );
  assert.equal(summary.headers.get("X-Gopeed-Cache"), "MISS");
  assert.deepEqual(await summary.json(), { data: [{ id: "summary" }] });
});

test("writes and authenticated requests bypass cache", () => {
  for (const path of [
    "/api/extensions/install",
    "/api/extensions/sync",
    "/zh/store",
  ]) {
    assert.equal(extensionCachePolicy(request(path)), undefined);
  }
  assert.equal(
    extensionCachePolicy(request("/api/extensions", { method: "POST" })),
    undefined,
  );
  assert.equal(
    extensionCachePolicy(
      request("/api/extensions", { headers: { Authorization: "Bearer test" } }),
    ),
    undefined,
  );
});

test("errors/private responses are never stored; cache failures fall back", async () => {
  const h = harness();
  for (const response of [
    Response.json({ error: "missing" }, { status: 404 }),
    Response.json({ error: "unavailable" }, { status: 503 }),
    Response.json({ data: [] }, { headers: { "Cache-Control": "private" } }),
    Response.json({ data: [] }, { headers: { "Set-Cookie": "session=test" } }),
  ]) {
    await withExtensionResponseCache(
      request("/api/extensions"),
      h.ctx,
      async () => response,
      h.cache,
    );
  }
  await h.flush();
  assert.equal(h.entries.size, 0);
  const response = await withExtensionResponseCache(
    request("/api/extensions"),
    h.ctx,
    async () => Response.json({ data: [] }),
    {
      match: async () => {
        throw new Error("cache unavailable");
      },
      put: async () => {
        throw new Error("cache unavailable");
      },
    },
  );
  await h.flush();
  assert.equal(response.status, 200);
});
