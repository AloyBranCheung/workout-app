import { trpc } from "src/utils/trpc"

export default function useUserAttributes() {
  return trpc.user.userAttributes.useQuery()
}
