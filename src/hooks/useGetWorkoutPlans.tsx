import { trpc } from "src/utils/trpc"

export default function useGetWorkoutPlans() {
  return trpc.workouts.getWorkoutPlans.useQuery()
}
