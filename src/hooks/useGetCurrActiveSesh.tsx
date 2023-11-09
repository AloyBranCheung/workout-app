import { trpc } from "src/utils/trpc"

export default function useGetCurrActiveSesh() {
  return trpc.currActiveSesh.getCurrActiveSesh.useQuery()
}
