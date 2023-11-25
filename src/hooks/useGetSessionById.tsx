import { trpc } from "src/utils/trpc"

export default function useGetSessionById(sessionId: string) {
  return trpc.session.getSession.useQuery(sessionId)
}
