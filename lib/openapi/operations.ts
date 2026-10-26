import type { Document } from "fumadocs-openapi";

const methods = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "trace",
] as const;

export function slugify(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function getOperations(document: Document) {
  return Object.entries(document.paths ?? {}).flatMap(([path, item]) => {
    if (!item || "$ref" in item) return [];
    return methods.flatMap((method) => {
      const operation = item[method];
      if (!operation) return [];
      const tag = slugify(operation.tags?.[0] ?? "other");
      const name = slugify(operation.operationId ?? `${method}-${path}`);
      return [
        {
          path,
          method,
          operation,
          parameters: item.parameters,
          slugs: [tag, name],
        },
      ];
    });
  });
}
