import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

const collectionOptions = {
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
};

export const docs = defineDocs({ dir: "content/docs", ...collectionOptions });
export const apiReference = defineDocs({
  dir: "content/api-reference",
  ...collectionOptions,
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
