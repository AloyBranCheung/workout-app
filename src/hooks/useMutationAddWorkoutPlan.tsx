import { trpc } from "src/utils/trpc"

export default function useMutationAddWorkoutPlan(
  onSuccess: () => void,
  onError: () => void
) {
  const utils = trpc.useContext()
  return trpc.workouts.addWorkoutPlan.useMutation({
    onSuccess() {
      onSuccess()
      utils.workouts.invalidate()
    },
    onError() {
      onError()
    },
  })
}
