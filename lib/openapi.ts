import type { Document } from "fumadocs-openapi";
import { createOpenAPI } from "fumadocs-openapi/server";
import swaggerDoc from "@/lib/openapi/swagger.json";

/** Key used to identify the schema inside fumadocs-openapi's internal map. */
export const SWAGGER_KEY = "gopeed";

export const openapi = createOpenAPI({
  input: () => ({
    [SWAGGER_KEY]: swaggerDoc as unknown as Document,
  }),
});
