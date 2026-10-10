import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { SchemeUriBlock } from "@/components/docs/SchemeUriBlock";
import { SchemeUriBuilder } from "@/components/docs/SchemeUriBuilder";

const DefaultMdxImage = defaultMdxComponents.img;

function MdxImage(props: ComponentProps<typeof DefaultMdxImage>) {
  // Imported images and /public assets can be delivered directly. Keep the
  // existing proxy behavior for remote images in documentation.
  const unoptimized =
    typeof props.src !== "string" || props.src.startsWith("/");
  return <DefaultMdxImage {...props} {...{ unoptimized }} />;
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: MdxImage,
    SchemeUriBuilder,
    SchemeUriBlock,
    ...components,
  };
}
