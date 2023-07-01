import { trpc } from "src/utils/trpc"

export default function useWorkoutPlans() {
  return trpc.workouts.getPlans.useQuery()
}
