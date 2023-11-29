import React from "react"
import { useUser } from "@supabase/auth-helpers-react"
import Page403 from "src/pages/403"

interface PageGuardProps {
  children: React.ReactNode
}

export default function PageGuard({ children }: PageGuardProps) {
  const user = useUser()
  if (!user) {
    return <Page403 />
  }

  return <>{children}</>
}
