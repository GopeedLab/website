"use client";

import { useState, useMemo } from "react";
import { SchemeUriBlock } from "./SchemeUriBlock";

type SchemePath = "create" | "extension";

interface CreateParams {
  req: {
    url: string;
  };
}

interface ExtensionParams {
  url: string;
  devMode: boolean;
}

export function SchemeUriBuilder() {
  const [path, setPath] = useState<SchemePath>("create");
  const [createUrl, setCreateUrl] = useState("https://example.com/file.zip");
  const [extUrl, setExtUrl] = useState(
    "https://github.com/user/gopeed-extension-example",
  );
  const [extDevMode, setExtDevMode] = useState(false);

  const generatedUri = useMemo(() => {
    try {
      if (path === "create") {
        const params: CreateParams = { req: { url: createUrl } };
        const encoded = btoa(JSON.stringify(params));
        return `gopeed:///create?params=${encoded}`;
      } else {
        const params: ExtensionParams = { url: extUrl, devMode: extDevMode };
        const encoded = btoa(JSON.stringify(params));
        return `gopeed:///extension?params=${encoded}`;
      }
    } catch {
      return "";
    }
  }, [path, createUrl, extUrl, extDevMode]);

  const paramJson = useMemo(() => {
    if (path === "create") {
      return JSON.stringify({ req: { url: createUrl } }, null, 2);
    }
    return JSON.stringify({ url: extUrl, devMode: extDevMode }, null, 2);
  }, [path, createUrl, extUrl, extDevMode]);

  return (
    <div className="not-prose my-6 rounded-xl border border-fd-border bg-fd-card overflow-hidden">
      {/* Path selector */}
      <div className="flex border-b border-fd-border">
        {(["create", "extension"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPath(p)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
              path === p
                ? "bg-primary-500/10 text-primary-600 dark:text-primary-400 border-b-2 border-primary-500"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            /{p}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="p-4 space-y-3">
        {path === "create" ? (
          <div>
            <label className="block text-sm font-medium text-fd-foreground mb-1">
              下载链接
            </label>
            <input
              type="text"
              value={createUrl}
              onChange={(e) => setCreateUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-fd-border bg-fd-secondary text-sm text-fd-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
              placeholder="https://example.com/file.zip"
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-fd-foreground mb-1">
                扩展地址
              </label>
              <input
                type="text"
                value={extUrl}
                onChange={(e) => setExtUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-fd-border bg-fd-secondary text-sm text-fd-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
                placeholder="https://github.com/user/gopeed-extension-example"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="devMode"
                checked={extDevMode}
                onChange={(e) => setExtDevMode(e.target.checked)}
                className="rounded border-fd-border text-primary-500 focus:ring-primary-500/30"
              />
              <label htmlFor="devMode" className="text-sm text-fd-foreground">
                开发模式
              </label>
            </div>
          </>
        )}
      </div>

      {/* Params preview */}
      <div className="px-4 pb-3">
        <label className="block text-xs font-medium text-fd-muted-foreground mb-1">
          params 解码内容
        </label>
        <pre className="text-xs bg-fd-secondary rounded-lg p-3 overflow-x-auto text-fd-muted-foreground">
          {paramJson}
        </pre>
      </div>

      {/* Generated URI */}
      <div className="px-4 pb-4">
        <label className="block text-xs font-medium text-fd-muted-foreground mb-1">
          生成的 URI
        </label>
        <div className="[&_figure]:my-0">
          <SchemeUriBlock uri={generatedUri} />
        </div>
      </div>
    </div>
  );
}
