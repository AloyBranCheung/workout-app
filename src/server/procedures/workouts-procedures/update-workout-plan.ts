import { tProtectedProcedure } from "src/server/trpc"
import { UpdatePlanSchema } from "src/validators/workout-schema"
import prisma from "src/utils/prisma"

const updateWorkoutPlan = tProtectedProcedure
  .input(UpdatePlanSchema)
  .mutation(async ({ input: { name, exercises, exerciseOrder, planId } }) => {
    console.log("exercises", exercises)
    console.log("exerciseorder", exerciseOrder)
    const updatedWorkoutPlan = await prisma.workoutPlan.update({
      where: {
        planId,
      },
      data: {
        name,
        exerciseOrder: {
          set: exerciseOrder,
        },
      },
    })
    return { updatedWorkoutPlan }
  })

export default updateWorkoutPlan
