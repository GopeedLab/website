import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gopeed - 一个现代化的下载器",
  description: "支持全平台的下载工具，提供简单易用的界面和强大的下载功能",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100 antialiased relative min-h-screen`}>
        {/* 全局背景渐变 */}
        <div className="fixed inset-0 -z-10">
          {/* 主背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
          
          {/* 动态光效 */}
          <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-transparent to-transparent opacity-50" />
          
          {/* 装饰性渐变 */}
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        </div>
        
        {children}
      </body>
    </html>
  );
}
