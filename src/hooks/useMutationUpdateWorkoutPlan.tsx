import { trpc } from "src/utils/trpc"

export default function useMutationUpdateWorkoutPlan(
  onSuccess: () => void,
  onError: () => void
) {
  const utils = trpc.useContext()
  return trpc.workouts.updateWorkoutPlan.useMutation({
    onSuccess() {
      onSuccess()
      utils.workouts.invalidate()
    },
    onError() {
      onError()
    },
  })
}
