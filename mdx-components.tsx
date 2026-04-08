import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { SchemeUriBuilder } from "@/components/docs/SchemeUriBuilder";
import { SchemeUriBlock } from "@/components/docs/SchemeUriBlock";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    SchemeUriBuilder,
    SchemeUriBlock,
    ...components,
  };
}
