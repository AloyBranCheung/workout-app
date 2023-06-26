import React from "react"
import { useUser } from "@supabase/auth-helpers-react"

export default function useUserAttributes() {
  const user = useUser()
  if (!user) return null
  // TODO: call User table to get user name
  // install tRPC (instead of react-query)
  // next.js backend for query with auth
  // return in this hook the object {email, name}

  return <div>useUserAttributes</div>
}
