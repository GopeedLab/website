import { Markdown } from "fumadocs-core/content";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import remarkGfm from "remark-gfm";

interface ReadmeRendererProps {
  content: string;
}

export async function ReadmeRenderer({ content }: ReadmeRendererProps) {
  return (
    <DocsBody>
      <Markdown components={defaultMdxComponents} remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </DocsBody>
  );
}
