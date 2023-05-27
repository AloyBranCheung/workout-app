import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import Page404 from "src/pages/404";

interface PageGuardProps {
  children: React.ReactNode;
}

export default function PageGuard({ children }: PageGuardProps) {
  const user = useUser();

  if (!user) {
    return <Page404 />;
  }

  return <>{children}</>;
}
