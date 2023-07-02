import { trpc } from "src/utils/trpc"

export default function useMutationAddExercise(
  onSuccess: () => void,
  onError: () => void
) {
  return trpc.workouts.addExercise.useMutation({
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      onError()
    },
  })
}
