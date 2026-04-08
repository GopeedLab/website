"use client";

import { CodeBlock } from "fumadocs-ui/components/codeblock";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

interface SchemeUriBlockProps {
  uri: string;
  /** Tailwind text color class for the URI text, e.g. "text-primary-600 dark:text-primary-400" */
  textClassName?: string;
}

export function SchemeUriBlock({ uri, textClassName }: SchemeUriBlockProps) {
  const handleOpen = () => {
    window.open(uri, "_self");
  };

  return (
    <CodeBlock
      allowCopy
      Actions={({
        className,
        children,
      }: {
        className?: string;
        children?: ReactNode;
      }) => (
        <div className={className}>
          <button
            onClick={handleOpen}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-1 text-fd-muted-foreground hover:text-fd-accent-foreground transition-colors cursor-pointer"
            title="Open"
          >
            <ArrowTopRightOnSquareIcon className="size-4" />
          </button>
          {children}
        </div>
      )}
    >
      <pre className="min-w-full w-max px-4 pr-14">
        <code className={textClassName}>{uri}</code>
      </pre>
    </CodeBlock>
  );
}
