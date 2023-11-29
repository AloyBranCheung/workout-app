import { trpc } from "src/utils/trpc"

export default function useGetActivities(activityId?: string) {
  return trpc.activity.getActivityById.useQuery({ activityId })
}
