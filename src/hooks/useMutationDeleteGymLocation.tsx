import { trpc } from "src/utils/trpc"

export default function useMutationDeleteGymLocation(
  onSuccess: () => void,
  onError: () => void
) {
  const utils = trpc.useContext()

  return trpc.gymLocations.deleteGymLocation.useMutation({
    onSuccess: () => {
      utils.gymLocations.invalidate()
    },
    onError,
  })
}
