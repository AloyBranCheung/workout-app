import { trpc } from "src/utils/trpc"

export default function useMutationCompletedWorkout() {
  return trpc.currActiveSesh.completedWorkout.useMutation()
}
