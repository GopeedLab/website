import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
