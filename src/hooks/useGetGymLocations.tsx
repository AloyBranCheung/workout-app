import { trpc } from "src/utils/trpc"

export default function useGetGymLocations() {
  return trpc.gymLocations.getGymLocations.useQuery()
}
