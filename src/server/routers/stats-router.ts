import { trouter } from "../trpc"
// procedures
import getStats from "../procedures/stats/get-stats"

const statsRouter = trouter({
  getStats,
})

export default statsRouter
