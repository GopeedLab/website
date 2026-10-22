import { Markdown } from "fumadocs-core/content";
import { DocsBody } from "fumadocs-ui/layouts/docs/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { ComponentProps } from "react";
import remarkGfm from "remark-gfm";

interface ReadmeRendererProps {
  content: string;
}

function ReadmeImage({ alt = "", ...props }: ComponentProps<"img">) {
  // External README images have no build-time dimensions and may be animated.
  return (
    // biome-ignore lint/performance/noImgElement: README images have unknown dimensions and need native rendering.
    <img
      {...props}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="max-w-full h-auto rounded-lg"
    />
  );
}

export async function ReadmeRenderer({ content }: ReadmeRendererProps) {
  return (
    <DocsBody>
      <Markdown
        components={{
          ...defaultMdxComponents,
          // Nest the author's document under the page's README section.
          h1: defaultMdxComponents.h3,
          h2: defaultMdxComponents.h4,
          h3: defaultMdxComponents.h5,
          h4: defaultMdxComponents.h6,
          h5: defaultMdxComponents.h6,
          img: ReadmeImage,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </Markdown>
    </DocsBody>
  );
}
