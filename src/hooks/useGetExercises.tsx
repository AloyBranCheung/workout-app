import { trpc } from "src/utils/trpc"

export default function useGetExercises() {
  return trpc.workouts.getExercises.useQuery()
}
