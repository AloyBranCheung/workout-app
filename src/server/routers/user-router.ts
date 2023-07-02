import { trouter } from "../trpc"
import getUserAttributes from "../procedures/user-procedures/get-user-attributes"

const userRouter = trouter({
  userAttributes: getUserAttributes,
})

export default userRouter
