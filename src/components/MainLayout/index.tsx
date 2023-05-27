import React from "react";
import PageGuard from "src/auth/PageGuard";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <PageGuard>{children}</PageGuard>;
}
