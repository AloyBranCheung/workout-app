import { tProtectedProcedure } from "src/server/trpc"
import WorkoutPlanSchema from "src/validators/add-workout-schema"

const addWorkoutPlan = tProtectedProcedure
  .input(WorkoutPlanSchema)
  .mutation(async ({ input }) => {
    console.log("input", input)
  })
export default addWorkoutPlan
