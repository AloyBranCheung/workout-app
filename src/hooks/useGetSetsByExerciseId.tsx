import { trpc } from "src/utils/trpc"

export default function useGetSetsByExerciseId(exerciseId: string) {
  return trpc.sets.getSetsByExerciseId.useQuery(exerciseId)
}
