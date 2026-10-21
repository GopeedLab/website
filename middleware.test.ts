import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

test("unprefixed pages redirect to saved or detected language", () => {
  for (const path of ["/docs", "/docs/install", "/store"]) {
    for (const [headers, locale] of [
      [new Headers({ "accept-language": "zh-CN,zh;q=0.9" }), "zh"],
      [
        new Headers({ cookie: "user-locale=zh", "accept-language": "en-US" }),
        "zh",
      ],
      [
        new Headers({
          cookie: "user-locale=zh-TW",
          referer: "https://gopeed.com/store",
        }),
        "zh-TW",
      ],
    ] as const) {
      const response = middleware(
        new NextRequest(`https://gopeed.com${path}`, { headers }),
      );
      assert.equal(response.status, 307);
      assert.equal(
        response.headers.get("location"),
        `https://gopeed.com/${locale}${path}`,
      );
      assert.equal(response.headers.get("cache-control"), "private, no-store");
    }
  }
});

test("switching from translated pages to English saves the choice on the rewrite", () => {
  for (const path of ["/", "/docs", "/docs/install", "/store"]) {
    const response = middleware(
      new NextRequest(`https://gopeed.com${path}`, {
        headers: {
          cookie: "user-locale=zh",
          "accept-language": "zh-CN,zh;q=0.9",
          referer: `https://gopeed.com/zh${path === "/" ? "" : path}`,
        },
      }),
    );
    assert.equal(response.headers.get("location"), null);
    assert.equal(
      response.headers.get("x-middleware-rewrite"),
      `https://gopeed.com/en${path === "/" ? "" : path}`,
    );
    assert.equal(response.cookies.get("user-locale")?.value, "en");

    const nextVisit = middleware(
      new NextRequest(`https://gopeed.com${path}`, {
        headers: { cookie: "user-locale=en", "accept-language": "zh-CN" },
      }),
    );
    assert.equal(nextVisit.headers.get("location"), null);
  }
});

test("the docs switcher's /en alias remembers English before normalizing the URL", () => {
  const response = middleware(
    new NextRequest("https://gopeed.com/en/docs/install?q=test", {
      headers: { cookie: "user-locale=zh", "accept-language": "zh-CN" },
    }),
  );
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://gopeed.com/docs/install?q=test",
  );
  assert.equal(response.cookies.get("user-locale")?.value, "en");
  assert.equal(response.headers.get("cache-control"), "private, no-store");

  const follow = middleware(
    new NextRequest(response.headers.get("location") as string, {
      headers: { cookie: "user-locale=en", "accept-language": "zh-CN" },
    }),
  );
  assert.equal(follow.headers.get("location"), null);
  assert.equal(
    follow.headers.get("x-middleware-rewrite"),
    "https://gopeed.com/en/docs/install?q=test",
  );
});

test("switching between translated versions updates the saved choice", () => {
  const response = middleware(
    new NextRequest("https://gopeed.com/ru/docs", {
      headers: {
        cookie: "user-locale=zh",
        referer: "https://gopeed.com/zh/docs",
      },
    }),
  );
  assert.equal(response.headers.get("location"), null);
  assert.equal(response.cookies.get("user-locale")?.value, "ru");
});

test("unrelated or external referrers do not bypass language detection", () => {
  for (const referer of [
    "https://example.com/zh/docs",
    "https://gopeed.com/zh/docs/install",
    "invalid-url",
  ]) {
    const response = middleware(
      new NextRequest("https://gopeed.com/docs", {
        headers: { cookie: "user-locale=zh", referer },
      }),
    );
    assert.equal(
      response.headers.get("location"),
      "https://gopeed.com/zh/docs",
    );
  }
});

test("English entry pages remain available with an English preference or no language headers", () => {
  for (const path of ["/docs", "/docs/install", "/store"]) {
    for (const headers of [
      new Headers(),
      new Headers({ cookie: "user-locale=en", "accept-language": "zh-CN" }),
    ]) {
      const response = middleware(
        new NextRequest(`https://gopeed.com${path}`, { headers }),
      );
      assert.equal(response.headers.get("location"), null);
      assert.equal(
        response.headers.get("x-middleware-rewrite"),
        `https://gopeed.com/en${path}`,
      );
    }
  }
});

test("first homepage visits detect browser language without caching the redirect", () => {
  for (const [language, target] of [
    ["zh-CN,zh;q=0.9,en;q=0.8", "/zh"],
    ["zh-TW,zh;q=0.9", "/zh-TW"],
    ["ru-RU,ru;q=0.9", "/ru"],
    ["en;q=0.5,zh;q=0.9", "/zh"],
  ]) {
    const response = middleware(
      new NextRequest("https://gopeed.com/?from=test", {
        headers: { "accept-language": language },
      }),
    );
    assert.equal(response.status, 307);
    assert.equal(
      response.headers.get("location"),
      `https://gopeed.com${target}?from=test`,
    );
    assert.equal(response.headers.get("cache-control"), "private, no-store");
    assert.equal(
      response.headers.get("vary"),
      "Accept-Language, Cookie, Referer",
    );
  }
});

test("manual language choices take priority on subsequent homepage visits", () => {
  for (const locale of ["en", "zh", "zh-TW", "ru"]) {
    const response = middleware(
      new NextRequest("https://gopeed.com/", {
        headers: {
          cookie: `user-locale=${locale}`,
          "accept-language": locale === "zh" ? "en-US" : "zh-CN,zh;q=0.9",
        },
      }),
    );
    if (locale === "en") {
      assert.equal(response.headers.get("location"), null);
      assert.equal(
        response.headers.get("x-middleware-rewrite"),
        "https://gopeed.com/en",
      );
    } else {
      assert.equal(
        response.headers.get("location"),
        `https://gopeed.com/${locale}`,
      );
    }
    assert.equal(response.headers.get("cache-control"), "private, no-store");
  }
});

test("homepage falls back to English for crawlers and unsupported browser languages", () => {
  for (const headers of [
    new Headers(),
    new Headers({ "accept-language": "de-DE,de;q=0.9" }),
    new Headers({ cookie: "user-locale=invalid", "accept-language": "en-US" }),
    new Headers({ "accept-language": "zh;q=0,en;q=1" }),
  ]) {
    const response = middleware(
      new NextRequest("https://gopeed.com/", { headers }),
    );
    assert.equal(response.headers.get("location"), null);
    assert.equal(
      response.headers.get("x-middleware-rewrite"),
      "https://gopeed.com/en",
    );
  }
});

test("explicit locale URLs override saved preferences and browser language", () => {
  for (const locale of ["zh", "zh-TW", "ru"]) {
    for (const path of [`/${locale}`, `/${locale}/docs`, `/${locale}/store`]) {
      const response = middleware(
        new NextRequest(`https://gopeed.com${path}`, {
          headers: { cookie: "user-locale=en", "accept-language": "en-US" },
        }),
      );
      assert.equal(response.headers.get("location"), null);
      assert.equal(response.headers.get("x-middleware-rewrite"), null);
      assert.equal(response.headers.get("x-middleware-next"), "1");
    }
  }
});

test("canonical redirects preserve paths and query parameters", () => {
  for (const [from, to] of [
    ["https://gopeed.com/en", "https://gopeed.com/"],
    ["https://gopeed.com/en/docs?q=test", "https://gopeed.com/docs?q=test"],
    [
      "https://gopeed.com/zh-CN/docs?q=test",
      "https://gopeed.com/zh/docs?q=test",
    ],
    ["https://www.gopeed.com/ru/docs", "https://gopeed.com/ru/docs"],
  ]) {
    const response = middleware(new NextRequest(from));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("location"), to);
  }
});

test("standalone OpenAPI routes bypass locale rewrites", () => {
  for (const path of ["/docs/openapi", "/docs/openapi/reference"]) {
    const response = middleware(new NextRequest(`https://gopeed.com${path}`));
    assert.equal(response.headers.get("x-middleware-next"), "1");
    assert.equal(response.headers.get("x-middleware-rewrite"), null);
  }
});

test("old duplicated locale URLs redirect once to the requested language", () => {
  for (const [path, expected] of [
    ["/zh/zh/docs/install", "/zh/docs/install"],
    ["/ru/zh/docs/dev-api", "/ru/docs/dev-api"],
    ["/zh-TW/ru/zh/docs", "/zh-TW/docs"],
    ["/zh-CN/zh-CN/docs", "/zh/docs"],
    ["/en/zh/docs", "/docs"],
  ]) {
    const response = middleware(
      new NextRequest(`https://gopeed.com${path}?from=old-link`, {
        headers: { "accept-language": "zh-CN" },
      }),
    );
    assert.equal(response.status, 301);
    assert.equal(
      response.headers.get("location"),
      `https://gopeed.com${expected}?from=old-link`,
    );
    if (path.startsWith("/en/")) {
      assert.equal(response.cookies.get("user-locale")?.value, "en");
    }
  }
});

test("locale-like content slugs are preserved", () => {
  for (const path of ["/zh/docs/ru", "/ru/docs/zh", "/zh/zh-tools"]) {
    const response = middleware(new NextRequest(`https://gopeed.com${path}`));
    assert.equal(response.headers.get("location"), null);
    assert.equal(response.headers.get("x-middleware-next"), "1");
  }
});
