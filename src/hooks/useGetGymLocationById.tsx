import { trpc } from "src/utils/trpc"

export default function useGetGymLocationById(gymId: string) {
  return trpc.gymLocations.getLocationById.useQuery(gymId)
}
