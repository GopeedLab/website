import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <RootProvider
          theme={{
            enabled: true,
            defaultTheme: "dark",
            attribute: "class",
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
