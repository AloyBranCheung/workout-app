import { trpc } from "src/utils/trpc"
import useToastMessage, { ToastMessage } from "./useToastMessage"

export default function useMutationUpdateGymLocationById() {
  const toastMessage = useToastMessage()
  const util = trpc.useContext()

  return trpc.gymLocations.updateGymLocationById.useMutation({
    onSuccess: () => {
      toastMessage("Successfully updated gym location.", ToastMessage.Success)
      util.gymLocations.invalidate()
    },
    onError: () => {
      toastMessage("Err: Unable to update gym location.", ToastMessage.Error)
    },
  })
}
