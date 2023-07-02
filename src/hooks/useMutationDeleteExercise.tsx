import { trpc } from "src/utils/trpc"

export default function useMutationDeleteExercise(
  onSuccess: () => void,
  onError: () => void
) {
  const utils = trpc.useContext()
  return trpc.workouts.deleteExercise.useMutation({
    onSuccess() {
      onSuccess()
      utils.workouts.invalidate()
    },
    onError() {
      onError()
    },
  })
}
