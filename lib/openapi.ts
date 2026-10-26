import type { Document } from "fumadocs-openapi";
import { createOpenAPI } from "fumadocs-openapi/server";
import { getOperations } from "@/lib/openapi/operations";
import schema from "@/lib/openapi/swagger.json";

const document = schema as Document;

// Import the downloaded schema so Workers never need a filesystem or GitHub fetch.
export const openapi = createOpenAPI({ input: { gopeed: document } });
export const apiOperations = getOperations(document);

export function getAPIOperation(slugs: string[]) {
  return apiOperations.find(
    (entry) => entry.slugs.join("/") === slugs.join("/"),
  );
}

/** A standalone OpenAPI fragment keeps parameters, bodies and responses readable by agents. */
export function getAPIMarkdown(slugs: string[]): string | undefined {
  const entry = getAPIOperation(slugs);
  if (!entry) return;
  const fragment = {
    openapi: document.openapi,
    info: {
      title: document.info?.title ?? "Gopeed API",
      version: document.info?.version ?? "v1",
    },
    servers: document.servers,
    paths: {
      [entry.path]: {
        parameters: entry.parameters,
        [entry.method]: entry.operation,
      },
    },
    components: {
      securitySchemes: document.components?.securitySchemes,
    } as Record<string, unknown>,
  };
  const seen = new Set<string>();
  function collectReferences(value: unknown) {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (
        key !== "$ref" ||
        typeof child !== "string" ||
        !child.startsWith("#/components/")
      ) {
        collectReferences(child);
        continue;
      }
      if (seen.has(child)) continue;
      seen.add(child);
      const [, , section, name] = child
        .split("/")
        .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"));
      const components = document.components as
        | Record<string, Record<string, unknown>>
        | undefined;
      const referenced = components?.[section]?.[name];
      if (!referenced) continue;
      fragment.components[section] ??= {};
      const target = fragment.components[section] as Record<string, unknown>;
      target[name] = referenced;
      collectReferences(referenced);
    }
  }
  collectReferences(fragment);
  return `${entry.method.toUpperCase()} ${entry.path}\n\n${entry.operation.description ?? ""}\n\n## OpenAPI\n\n\`\`\`json\n${JSON.stringify(fragment, null, 2)}\n\`\`\``;
}
