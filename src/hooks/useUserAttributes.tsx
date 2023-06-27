import { useUser } from "@supabase/auth-helpers-react"
import { trpc } from "src/utils/trpc"

export default function useUserAttributes() {
  const user = useUser()
  if (!user) return { data: null }

  return trpc.user.userAttributes.useQuery()
}
