import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NavigationProgress } from "@/components/NavigationProgress";
import { BASE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Gopeed",
    default: "API Reference | Gopeed",
  },
  icons: {
    icon: "/images/logo.png",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NavigationProgress />
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
