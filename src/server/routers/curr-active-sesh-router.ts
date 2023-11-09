import { trouter } from "../trpc"
// procedures
import getCurrActiveSesh from "../procedures/curr-active-sesh-procedures/get-curr-active-sesh"

const currActiveSeshRouter = trouter({
  getCurrActiveSesh,
})

export default currActiveSeshRouter
