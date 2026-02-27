import { createOpenAPI } from "fumadocs-openapi/server";

const SWAGGER_URL =
  "https://raw.githubusercontent.com/GopeedLab/gopeed-js/refs/heads/main/packages/gopeed-openapi/swagger.json";

export const openapi = createOpenAPI({
  input: [SWAGGER_URL],
});

export { SWAGGER_URL };
