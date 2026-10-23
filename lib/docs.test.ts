import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { openapiTranslations } from "fumadocs-openapi/i18n";
import { uiTranslations } from "fumadocs-ui/i18n";
import { getPageMarkdownUrl } from "@/lib/docs-urls";
import { locales } from "@/lib/i18n/config";
import { fumadocsTranslations } from "@/lib/i18n/fumadocs";
import { apiOperations, getAPIMarkdown, getAPIOperation } from "@/lib/openapi";

test("API routes are unique and retain stable operation names", () => {
  const routes = apiOperations.map((entry) => entry.slugs.join("/"));
  assert.equal(new Set(routes).size, routes.length);
  const create = getAPIOperation(["tasks", "create-task"]);
  assert.equal(create?.operation.operationId, "CreateTask");
  assert.equal(create?.method, "post");
  assert.equal(create?.path, "/api/v1/tasks");
});

test("every exported API fragment includes all referenced components", () => {
  for (const entry of apiOperations) {
    const markdown = getAPIMarkdown(entry.slugs);
    assert.ok(markdown);
    const json = markdown.match(/```json\n([\s\S]+)\n```/)?.[1];
    assert.ok(json);
    const fragment = JSON.parse(json);
    assert.deepEqual(fragment.paths[entry.path][entry.method], entry.operation);
    assert.equal(
      fragment.components.securitySchemes["X-Api-Token"].in,
      "header",
    );
    function check(value: unknown) {
      if (!value || typeof value !== "object") return;
      for (const [key, child] of Object.entries(value)) {
        if (key === "$ref" && typeof child === "string") {
          assert.ok(child.startsWith("#/"));
          const target = child
            .slice(2)
            .split("/")
            .reduce(
              (node, part) =>
                node?.[part.replace(/~1/g, "/").replace(/~0/g, "~")],
              fragment,
            );
          assert.notEqual(
            target,
            undefined,
            `${entry.operation.operationId}: unresolved ${child}`,
          );
        } else check(child);
      }
    }
    check(fragment);
  }
});

test("localized API pages share the unmodified English operation content", async () => {
  for (const entry of apiOperations) {
    const path = `${entry.slugs.join("/")}.mdx`;
    const english = await readFile(join("content/api-reference", path), "utf8");
    for (const locale of locales.filter((locale) => locale !== "en")) {
      assert.equal(
        await readFile(join("content/api-reference", locale, path), "utf8"),
        english,
      );
    }
  }
});

test("UI language packs cover every registered label and preserve variables", () => {
  const keys = new Set([
    ...uiTranslations().keys,
    ...openapiTranslations().keys,
  ]);
  for (const locale of locales.filter((locale) => locale !== "en")) {
    const values = fumadocsTranslations.get(locale);
    for (const key of keys) {
      assert.ok(values[key], `${locale}: missing ${key}`);
      const variables = (value: string) =>
        [...value.matchAll(/\{\w+\}/g)].map((match) => match[0]).sort();
      assert.deepEqual(
        variables(values[key]),
        variables(key),
        `${locale}: variables in ${key}`,
      );
    }
  }
});

test("Markdown links retain the page language and support docs home", () => {
  assert.equal(
    getPageMarkdownUrl({ url: "/zh/docs", slugs: [] }),
    "/zh/docs/index.md",
  );
  assert.equal(
    getPageMarkdownUrl({
      url: "/ru/api-reference/tasks/create-task",
      slugs: ["tasks", "create-task"],
    }),
    "/ru/api-reference/tasks/create-task.md",
  );
});
