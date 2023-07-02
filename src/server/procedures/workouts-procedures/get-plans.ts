import { tProtectedProcedure } from "src/server/trpc"
import { MOCK_WORKOUT_PLANS } from "src/mocks/workouts"

const getPlans = tProtectedProcedure.query(async () => {
  // const {
  //   ctx: { user },
  // } = opts

  // const userId = user.id
  return { workoutPlans: MOCK_WORKOUT_PLANS }
})

export default getPlans