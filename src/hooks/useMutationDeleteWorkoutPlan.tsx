import { trpc } from "src/utils/trpc"

export default function useMutationDeleteWorkoutPlan(
  onSucces: () => void,
  onError: () => void
) {
  const utils = trpc.useContext()
  return trpc.workouts.deleteWorkout.useMutation({
    onSuccess() {
      onSucces()
      utils.workouts.invalidate()
    },
    onError() {
      onError()
    },
  })
}
