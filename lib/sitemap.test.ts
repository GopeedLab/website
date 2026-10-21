import assert from "node:assert/strict";
import test from "node:test";
import { sitemapResponse, sitemapXml } from "./sitemap";

test("sitemap reads the current catalog instead of a build-time snapshot", async () => {
  const catalog = [{ id: "author@first", updatedAt: new Date("2026-10-01") }];
  const first = await sitemapResponse([], async () => catalog);
  assert.equal(first.status, 200);
  assert.match(await first.text(), /author%40first/);
  catalog.push({ id: "author@new", updatedAt: new Date("2026-10-02") });
  const second = await sitemapResponse([], async () => catalog);
  const xml = await second.text();
  assert.match(xml, /author%40new/);
  assert.equal((xml.match(/<loc>/g) ?? []).length, 16);
  assert.match(second.headers.get("cache-control") ?? "", /s-maxage=300/);
});

test("database outages are retryable and never publish a partial sitemap", async (t) => {
  t.mock.method(console, "error", () => {});
  const response = await sitemapResponse([{ url: "/docs" }], async () => {
    throw new Error("D1 unavailable");
  });
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("retry-after"), "300");
  assert.doesNotMatch(await response.text(), /<url>/);
});

test("XML uses public encoded URLs, reciprocal alternates and actual modification dates", () => {
  const xml = sitemapXml(
    [{ url: "/zh/docs", locale: "zh" }, { url: "/docs/a&b" }],
    [{ id: "author@name", updatedAt: new Date("2026-10-01") }],
  );
  assert.doesNotMatch(xml, /\/zh\/zh\//);
  assert.match(xml, /<loc>https:\/\/gopeed.com\/zh\/docs<\/loc>/);
  assert.match(xml, /hreflang="x-default" href="https:\/\/gopeed.com\/docs"/);
  assert.match(xml, /<loc>https:\/\/gopeed.com\/docs\/a&amp;b<\/loc>/);
  assert.match(xml, /<loc>https:\/\/gopeed.com\/store\/author%40name<\/loc>/);
  assert.equal((xml.match(/<lastmod>/g) ?? []).length, 4);
  assert.match(xml, /<lastmod>2026-10-01T00:00:00.000Z<\/lastmod>/);
});
