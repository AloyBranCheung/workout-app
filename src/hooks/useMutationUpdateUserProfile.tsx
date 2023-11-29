import { trpc } from "src/utils/trpc"

export default function useMutationUpdateUserProfile() {
  return trpc.user.updateUserPreferences.useMutation()
}
