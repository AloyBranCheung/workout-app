import { trouter } from "../trpc"
// procedures
import getCurrActiveSesh from "../procedures/curr-active-sesh-procedures/get-curr-active-sesh"
import completedWorkout from "../procedures/curr-active-sesh-procedures/completed-workout"

const currActiveSeshRouter = trouter({
  getCurrActiveSesh,
  completedWorkout,
})

export default currActiveSeshRouter
