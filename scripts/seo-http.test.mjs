import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readdirSync } from "node:fs";
import { createServer } from "node:net";
import { resolve } from "node:path";
import { after, before, test } from "node:test";

const locales = ["en", "zh", "zh-TW", "ru"];
const ogLocales = { en: "en_US", zh: "zh_CN", "zh-TW": "zh_TW", ru: "ru_RU" };
const docsPaths = readdirSync("content/docs")
  .filter((file) => file.endsWith(".mdx"))
  .map((file) =>
    file === "index.mdx" ? "/docs" : `/docs/${file.slice(0, -4)}`,
  );
const fixtureExtensions = [
  "monkeyWie@youtube",
  "Locon213@gopeed-extension-mediafire",
];
const paths = [
  "/",
  "/store",
  ...docsPaths,
  ...fixtureExtensions.map((id) => `/store/${encodeURIComponent(id)}`),
];
let server;
let origin;

before(async () => {
  const reservation = createServer();
  await new Promise((resolve) => reservation.listen(0, "127.0.0.1", resolve));
  const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve));
  origin = `http://localhost:${port}`;
  server = spawn(
    process.execPath,
    [
      "--import",
      resolve("scripts/seo-test-context.mjs"),
      resolve("node_modules/next/dist/bin/next"),
      "start",
      "-H",
      "localhost",
      "-p",
      String(port),
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  await new Promise((resolve, reject) => {
    let output = "";
    const timeout = setTimeout(
      () => reject(new Error(`Next.js startup timed out: ${output}`)),
      30_000,
    );
    const record = (chunk) => {
      output += chunk.toString();
      if (output.includes("Ready in")) {
        clearTimeout(timeout);
        resolve();
      }
    };
    server.stdout.on("data", record);
    server.stderr.on("data", record);
    server.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    server.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Next.js exited (${code}): ${output}`));
    });
  });
});

after(async () => {
  if (server && server.exitCode === null) {
    const exited = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGTERM");
    await exited;
  }
});

const localized = (locale, path) =>
  locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;
const publicUrl = (locale, path) =>
  new URL(localized(locale, path), "https://gopeed.com").href;
const alternates = (path) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, publicUrl(locale, path)]),
  ),
  "x-default": publicUrl("en", path),
});
const request = (path, headers = {}) =>
  fetch(`${origin}${path}`, { headers, redirect: "manual" });
const decode = (text) =>
  text.replace(
    /&(amp|quot|lt|gt|#39|#x27);/g,
    (match) =>
      ({
        "&amp;": "&",
        "&quot;": '"',
        "&lt;": "<",
        "&gt;": ">",
        "&#39;": "'",
        "&#x27;": "'",
      })[match],
  );
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key.toLowerCase(),
      decode(value),
    ]),
  );
function metadata(html) {
  const page = { meta: {}, alternates: {} };
  for (const [tag] of html.matchAll(/<(?:html|link|meta)\b[^>]*>/g)) {
    const values = attrs(tag);
    if (tag.startsWith("<html")) page.lang = values.lang;
    if (values.rel === "canonical") page.canonical = new URL(values.href).href;
    if (values.rel === "alternate")
      page.alternates[values.hreflang] = new URL(values.href).href;
    if (values.name || values.property)
      page.meta[values.name || values.property] = values.content;
  }
  page.title = decode(html.match(/<title>(.*?)<\/title>/s)[1]);
  return page;
}

test("browser entry URLs negotiate language, preserve query strings, and avoid shared redirect caches", async () => {
  for (const path of ["/", "/docs", "/docs/install", "/store"]) {
    for (const locale of ["zh", "zh-TW", "ru"]) {
      const response = await request(`${path}?from=test`, {
        "Accept-Language": locale,
      });
      assert.equal(response.status, 307);
      assert.equal(
        new URL(response.headers.get("location"), origin).pathname,
        localized(locale, path),
      );
      assert.equal(
        new URL(response.headers.get("location"), origin).search,
        "?from=test",
      );
      assert.match(response.headers.get("cache-control"), /private, no-store/);
    }
    const saved = await request(path, {
      "Accept-Language": "zh-CN",
      Cookie: "user-locale=ru",
    });
    assert.equal(saved.status, 307);
    assert.equal(
      new URL(saved.headers.get("location"), origin).pathname,
      localized("ru", path),
    );
  }
});

test("manual English switches survive normalization, rewrites, and subsequent visits", async () => {
  for (const path of ["/", "/docs", "/docs/install", "/store"]) {
    const response = await request(`/en${path === "/" ? "" : path}`, {
      "Accept-Language": "zh-CN",
      Cookie: "user-locale=zh",
    });
    assert.equal(response.status, 301);
    assert.equal(
      new URL(response.headers.get("location"), origin).pathname,
      path,
    );
    assert.match(response.headers.get("set-cookie"), /user-locale=en;/);
    const cookie = response.headers.get("set-cookie").split(";", 1)[0];
    const follow = await request(path, {
      "Accept-Language": "zh-CN",
      Cookie: cookie,
    });
    assert.equal(follow.status, 200);
    assert.equal(metadata(await follow.text()).lang, "en");

    const direct = await request(path, {
      "Accept-Language": "zh-CN",
      Cookie: "user-locale=zh",
      Referer: `${origin}${localized("zh", path)}`,
    });
    assert.equal(direct.status, 200);
    assert.match(direct.headers.get("set-cookie"), /user-locale=en;/);
    assert.equal(metadata(await direct.text()).lang, "en");
  }
});

test("every public locale page exposes reciprocal SEO metadata to crawlers", async () => {
  for (const path of paths) {
    for (const locale of locales) {
      // Googlebot does not send Accept-Language. No bot-specific routing is used.
      const response = await request(localized(locale, path), {
        "User-Agent": "Googlebot",
      });
      assert.equal(response.status, 200, `${locale} ${path}`);
      const html = await response.text();
      const page = metadata(html);
      assert.equal(page.lang, locale);
      assert.equal(page.canonical, publicUrl(locale, path));
      assert.deepEqual(page.alternates, alternates(path));
      assert.equal(
        page.meta["og:url"],
        publicUrl(locale, path).replace(/\/$/, ""),
      );
      assert.equal(page.meta["og:title"], page.title);
      assert.equal(page.meta["twitter:title"], page.title);
      assert.equal(page.meta["og:description"], page.meta.description);
      assert.equal(page.meta["twitter:description"], page.meta.description);
      assert.equal(page.meta["og:locale"], ogLocales[locale]);
      assert.equal(
        page.meta["og:image"],
        "https://gopeed.com/images/screenshot.png",
      );
      assert.equal(page.meta["twitter:image"], page.meta["og:image"]);
      if (path.startsWith("/docs")) {
        const data = [
          ...html.matchAll(
            /<script type="application\/ld\+json">(.*?)<\/script>/gs,
          ),
        ].flatMap(([, json]) => JSON.parse(json));
        const crumbs = data.find(
          (item) => item["@type"] === "BreadcrumbList",
        ).itemListElement;
        assert.equal(crumbs.length, path === "/docs" ? 2 : 3);
        assert.equal(crumbs.at(-1).item, publicUrl(locale, path));
      }
    }
  }
  const image = await request("/images/screenshot.png");
  assert.equal(image.status, 200);
});

test("sitemap URLs and hreflang match the HTML for all public locale pages", async () => {
  const response = await request("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const urls = new Map();
  for (const [, entry] of xml.matchAll(/<url>(.*?)<\/url>/gs)) {
    const url = decode(entry.match(/<loc>(.*?)<\/loc>/s)[1]);
    assert.ok(!urls.has(url), `duplicate sitemap URL: ${url}`);
    const languages = Object.fromEntries(
      [...entry.matchAll(/<xhtml:link\b[^>]*>/g)].map(([tag]) => {
        const values = attrs(tag);
        return [values.hreflang, new URL(values.href).href];
      }),
    );
    urls.set(url, languages);
  }
  for (const path of paths) {
    for (const locale of locales) {
      assert.deepEqual(urls.get(publicUrl(locale, path)), alternates(path));
    }
  }
  assert.equal(urls.size, paths.length * locales.length);
});

test("old duplicated locale URLs resolve directly to working localized docs", async () => {
  for (const [path, target] of [
    ["/zh/zh/docs/install", "/zh/docs/install"],
    ["/ru/zh/docs/dev-api", "/ru/docs/dev-api"],
    ["/zh-TW/zh/docs", "/zh-TW/docs"],
  ]) {
    const response = await request(`${path}?from=legacy`);
    assert.equal(response.status, 301);
    const location = new URL(response.headers.get("location"), origin);
    assert.equal(location.pathname, target);
    assert.equal(location.search, "?from=legacy");
    assert.equal((await fetch(location)).status, 200);
  }
});

test("homepage exposes platform links and its LCP image without waiting for JavaScript", async () => {
  const platforms = [
    "monkeyWie@youtube",
    "zayn@gopeed-extention-huggingface",
    "Locon213@gopeed-extension-mediafire",
    "Locon213@tiktok-downloader",
    "muzzii255@gopeed-extension-instagram",
    "holyguacamoleCoder@gopeed-extension-github",
  ];
  for (const locale of locales) {
    const html = await (await request(localized(locale, "/"))).text();
    const links = [...html.matchAll(/<a\b[^>]*>(.*?)<\/a>/gs)].map(
      ([tag, content]) => ({ ...attrs(tag), content }),
    );
    for (const id of platforms) {
      const link = links.find((item) => item["data-extension-id"] === id);
      assert.ok(link, `${locale} ${id}`);
      assert.equal(
        link.href,
        localized(locale, `/store/${encodeURIComponent(id)}`),
      );
      assert.match(link.content, /<h3\b/);
      assert.doesNotMatch(link.content, /opacity:0/);
    }
    const image = [...html.matchAll(/<img\b[^>]*>/g)]
      .map(([tag]) => attrs(tag))
      .find((item) => item.src === "/images/screenshot.webp");
    assert.ok(image);
    assert.notEqual(image.loading, "lazy");
    assert.match(
      html,
      /<link[^>]*rel="preload"[^>]*href="\/images\/screenshot.webp"/,
    );
    assert.doesNotMatch(html.match(/<h1\b.*?<\/h1>/s)?.[0] ?? "", /opacity:0/);
  }
  const image = await request("/images/screenshot.webp");
  assert.equal(image.status, 200);
  assert.ok(Number(image.headers.get("content-length")) < 60_000);
});

test("store titles are crawlable links using the same encoded URLs as the sitemap", async () => {
  for (const locale of locales) {
    const html = await (await request(localized(locale, "/store"))).text();
    for (const id of fixtureExtensions) {
      const links = [...html.matchAll(/<a\b[^>]*>(.*?)<\/a>/gs)];
      const link = links.find(
        ([tag]) => attrs(tag)["data-extension-id"] === id,
      );
      assert.ok(link, `${locale} ${id}`);
      assert.equal(
        attrs(link[0]).href,
        localized(locale, `/store/${encodeURIComponent(id)}`),
      );
      assert.match(link[1], /fixture/);
    }
  }
});

test("robots allows shared images, while machine-readable text and API responses carry noindex", async () => {
  const robots = await (await request("/robots.txt")).text();
  assert.doesNotMatch(robots, /Disallow: \/(?:og|images)\//);
  assert.match(robots, /Sitemap: https:\/\/gopeed.com\/sitemap.xml/);
  for (const path of [
    "/llms.txt",
    "/llms-full.txt",
    "/docs/install.mdx",
    "/api/extensions?view=summary",
  ]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("x-robots-tag"), "noindex", path);
  }
  const page = await request("/zh/docs/install");
  assert.equal(page.headers.get("x-robots-tag"), null);
});

test("shared navigation links use existing pages and the homepage download section", async () => {
  for (const locale of locales) {
    for (const path of ["/", "/store"]) {
      const html = await (await request(localized(locale, path))).text();
      const links = [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) =>
        attrs(tag),
      );
      assert.ok(
        links.some(
          (link) => link.href === `${localized(locale, "/")}#downloads`,
        ),
      );
      assert.ok(
        links.some((link) => link.href === localized(locale, "/store")),
      );
      assert.ok(links.some((link) => link.href === localized(locale, "/docs")));
      assert.ok(
        !links.some((link) => ["/privacy", "/terms"].includes(link.href)),
      );
    }
  }
});
