import { trpc } from "src/utils/trpc"

export default function useMutationUpdateExercise(
  onSuccess: () => void,
  onError: () => void
) {
  const utils = trpc.useContext()
  return trpc.workouts.updateExercise.useMutation({
    onSuccess() {
      onSuccess()
      utils.workouts.invalidate()
    },
    onError() {
      onError()
    },
  })
}
