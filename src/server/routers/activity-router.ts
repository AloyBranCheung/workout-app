import { trouter } from "../trpc"
// procedures
import getActivityById from "../procedures/activity-procedures/get-activity-by-id"

const activityRouter = trouter({
  getActivityById,
})

export default activityRouter
