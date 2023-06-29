import { tProtectedProcedure, trouter } from "../trpc"
import MOCK_RECENT_ACTIVITY from "src/mocks/recent-activity"

const statsRouter = trouter({
  getStats: tProtectedProcedure.query(async () => {
    // const {
    //   ctx: { user },
    // } = opts

    // const userId = user.id
    // TODO: setup postgres tables and finish backend
    return { recentActivity: MOCK_RECENT_ACTIVITY }
  }),
})

export default statsRouter
