import { trpc } from "src/utils/trpc"

export default function useGetCurrActiveSesh(workoutPlanId?: string) {
  return trpc.currActiveSesh.getCurrActiveSesh.useQuery(
    {
      workoutPlanId,
    },
    {
      cacheTime: 0,
    }
  )
}
