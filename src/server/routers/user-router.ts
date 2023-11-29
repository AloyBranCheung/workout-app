import { trouter } from "../trpc"
import getUserAttributes from "../procedures/user-procedures/get-user-attributes"
import updateUserPreferences from "../procedures/user-procedures/update-user-preferences"

const userRouter = trouter({
  userAttributes: getUserAttributes,
  updateUserPreferences,
})

export default userRouter
