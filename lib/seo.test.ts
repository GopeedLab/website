import assert from "node:assert/strict";
import test from "node:test";
import { locales } from "./i18n";
import { breadcrumbJsonLd } from "./jsonld";
import { BASE_URL, canonicalUrl, pageAlternates } from "./seo";

const docsAlternates = {
  en: `${BASE_URL}/docs`,
  zh: `${BASE_URL}/zh/docs`,
  "zh-TW": `${BASE_URL}/zh-TW/docs`,
  ru: `${BASE_URL}/ru/docs`,
  "x-default": `${BASE_URL}/docs`,
};

test("all localized docs URLs declare the same reciprocal hreflang targets", () => {
  for (const locale of locales) {
    const sourceUrl = new URL(docsAlternates[locale]).pathname;
    assert.deepEqual(pageAlternates(locale, sourceUrl), {
      canonical: docsAlternates[locale],
      languages: docsAlternates,
    });
  }
});

test("nested docs and sitemap URLs contain exactly one target locale", () => {
  for (const sourceLocale of locales) {
    const sourcePath =
      sourceLocale === "en" ? "/docs/dev/api" : `/${sourceLocale}/docs/dev/api`;
    for (const targetLocale of locales) {
      const prefix = targetLocale === "en" ? "" : `/${targetLocale}`;
      assert.equal(
        canonicalUrl(targetLocale, sourcePath),
        `${BASE_URL}${prefix}/docs/dev/api`,
      );
    }
  }
});

test("normalizes home and trailing slashes without stripping locale-like slugs", () => {
  assert.equal(canonicalUrl("zh", "/zh/"), `${BASE_URL}/zh`);
  assert.equal(canonicalUrl("en", "/zh/"), `${BASE_URL}/`);
  assert.equal(canonicalUrl("en", "/en/docs/"), `${BASE_URL}/docs`);
  assert.equal(canonicalUrl("zh", "docs/"), `${BASE_URL}/zh/docs`);
  assert.equal(canonicalUrl("en", ""), `${BASE_URL}/`);
  assert.equal(canonicalUrl("en", "/zh-tools"), `${BASE_URL}/zh-tools`);
  assert.equal(canonicalUrl("zh", "/store/zh"), `${BASE_URL}/zh/store/zh`);
});

test("breadcrumbs accept Fumadocs URLs without duplicating the locale", () => {
  const data = breadcrumbJsonLd("zh", [
    { name: "Gopeed", path: "/" },
    { name: "文档", path: "/docs" },
    { name: "安装", path: "/zh/docs/install" },
  ]);
  assert.deepEqual(
    data.itemListElement.map((item) => item.item),
    [`${BASE_URL}/zh`, `${BASE_URL}/zh/docs`, `${BASE_URL}/zh/docs/install`],
  );
});
