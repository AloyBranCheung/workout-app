import { trouter } from "../trpc"
// procedures
import getSession from "../procedures/session-procedures/get-session"

const sessionRouter = trouter({
  getSession,
})

export default sessionRouter
