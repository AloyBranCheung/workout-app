import { trpc } from "src/utils/trpc"

export default function useStats() {
  return trpc.stats.getStats.useQuery()
}
