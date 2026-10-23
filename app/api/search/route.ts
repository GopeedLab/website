import { createI18nSearchAPI } from "fumadocs-core/search/server";
import { i18n } from "@/lib/i18n";
import { getAPIOperation } from "@/lib/openapi";
import { getAllPages } from "@/lib/source";

export const { GET } = createI18nSearchAPI("advanced", {
  i18n,
  indexes: async () =>
    Promise.all(
      getAllPages().map(async (page) => {
        const data = await page.data.structuredData;
        const api = page.data._openapi
          ? getAPIOperation(page.slugs)
          : undefined;
        return {
          id: page.url,
          locale: page.locale ?? "en",
          title: page.data.title,
          description: page.data.description,
          url: page.url,
          structuredData: {
            ...data,
            contents: [
              ...data.contents,
              ...(api
                ? [
                    {
                      heading: undefined,
                      content: `${api.method.toUpperCase()} ${api.path} ${api.operation.operationId}\n${JSON.stringify({ parameters: api.operation.parameters, requestBody: api.operation.requestBody })}`,
                    },
                  ]
                : []),
            ],
          },
        };
      }),
    ),
});
