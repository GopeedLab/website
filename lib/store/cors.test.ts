import assert from "node:assert/strict";
import test from "node:test";
import { withExtensionCors } from "./cors";
import { withExtensionResponseCache } from "./response-cache";

const request = (path: string, init?: RequestInit) =>
  new Request(`https://gopeed.com${path}`, {
    ...init,
    headers: { Origin: "http://localhost:9999", ...init?.headers },
  });

for (const [path, method] of [
  ["/api/extensions", "GET"],
  ["/api/extensions/author%40name", "GET"],
  ["/api/extensions/install", "POST"],
]) {
  test(`${path} preflight does not call Next.js or the database`, async () => {
    const response = await withExtensionCors(
      request(path, {
        method: "OPTIONS",
        headers: {
          "Access-Control-Request-Method": method,
          "Access-Control-Request-Headers": "content-type",
        },
      }),
      async () => {
        throw new Error("preflight reached handler");
      },
    );
    assert.equal(response.status, 204);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
    assert.equal(
      response.headers.get("Access-Control-Allow-Methods"),
      `${method}, OPTIONS`,
    );
    assert.equal(
      response.headers.get("Access-Control-Allow-Headers"),
      "Content-Type",
    );
    assert.equal(
      response.headers.has("Access-Control-Allow-Credentials"),
      false,
    );
    assert.equal(await response.text(), "");
  });
}

test("success and error responses remain readable across origins", async () => {
  for (const status of [200, 400, 404, 405, 500, 503]) {
    const response = await withExtensionCors(
      request("/api/extensions/install", { method: "POST" }),
      async () => Response.json({ status }, { status }),
    );
    assert.equal(response.status, status);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
    assert.deepEqual(await response.json(), { status });
  }
});

test("existing cached responses receive CORS without losing freshness headers", async () => {
  const response = await withExtensionCors(request("/api/extensions"), () =>
    withExtensionResponseCache(
      request("/api/extensions"),
      { waitUntil: () => assert.fail("cache hit tried to write") },
      async () => {
        throw new Error("cache hit reached handler");
      },
      {
        match: async () => Response.json({ data: [] }),
        put: async () => assert.fail("cache hit tried to write"),
      },
    ),
  );
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
  assert.equal(response.headers.get("X-Gopeed-Cache"), "HIT");
  assert.equal(
    response.headers.get("Cache-Control"),
    "public, max-age=60, s-maxage=600",
  );
  assert.deepEqual(await response.json(), { data: [] });
});

test("sync and unrelated routes keep their existing behavior", async () => {
  for (const path of [
    "/api/extensions/sync",
    "/api/extensions/%73ync",
    "/api/releases",
    "/store",
  ]) {
    const original = new Response("unchanged", { status: 401 });
    const response = await withExtensionCors(
      request(path, { method: "OPTIONS" }),
      async () => original,
    );
    assert.equal(response, original);
    assert.equal(response.headers.has("Access-Control-Allow-Origin"), false);
  }
});
