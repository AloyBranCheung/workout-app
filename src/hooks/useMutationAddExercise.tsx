import { trpc } from "src/utils/trpc"

export default function useMutationAddExercise(
  onSuccess: () => void,
  onError: () => void
) {
  const utils = trpc.useContext()
  return trpc.workouts.addExercise.useMutation({
    onSuccess: () => {
      onSuccess()
      utils.workouts.invalidate()
    },
    onError: () => {
      onError()
    },
  })
}
