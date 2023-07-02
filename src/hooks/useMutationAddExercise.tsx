import { trpc } from "src/utils/trpc"

export default function useMutationAddExercise() {
  return trpc.workouts.addExercise.useMutation()
}
