import { tProtectedProcedure, trouter } from "../trpc"
import MOCK_RECENT_ACTIVITY, { MOCK_TOP_STATS } from "src/mocks/recent-activity"

const statsRouter = trouter({
  getStats: tProtectedProcedure.query(async () => {
    // const {
    //   ctx: { user },
    // } = opts

    // const userId = user.id
    // TODO: setup postgres tables and finish backend
    return { recentActivity: MOCK_RECENT_ACTIVITY, topStats: MOCK_TOP_STATS }
  }),
})

export default statsRouter
