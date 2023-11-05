import { trpc } from "src/utils/trpc"
import { CreateGymLocationOutput } from "src/types/trpc/router-types"

export default function useMutationAddGymLocation(
  onSuccess: (data: CreateGymLocationOutput) => void,
  onError: () => void
) {
  const utils = trpc.useContext()

  return trpc.gymLocations.addGymLocation.useMutation({
    onSuccess: (data) => {
      onSuccess(data)
      utils.gymLocations.invalidate()
    },
    onError: () => {
      onError()
    },
  })
}
