import { ApiReference } from "@scalar/nextjs-api-reference";
import spec from "@/lib/openapi/swagger.json";

export const GET = ApiReference({
  content: spec,
  defaultOpenAllTags: true,
  showDeveloperTools: "never",
  hideModels: true,
});
