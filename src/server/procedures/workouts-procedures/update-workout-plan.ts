import { tProtectedProcedure } from "src/server/trpc"
import { UpdatePlanSchema } from "src/validators/workout-schema"
import prisma from "src/utils/prisma"

const updateWorkoutPlan = tProtectedProcedure
  .input(UpdatePlanSchema)
  .mutation(async ({ input: { name, exercises, exerciseOrder, planId } }) => {
    await prisma.workoutPlan.update({
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

    const updateExercise = async (exerciseId: string) => {
      const exercise = exercises[exerciseId]
      await prisma.exercise.update({
        where: {
          exerciseId,
        },
        data: {
          targetReps: Number(exercise.reps),
          targetSets: Number(exercise.sets),
          workoutPlans: {
            connect: {
              planId,
            },
          },
        },
      })
    }

    await Promise.all(
      exerciseOrder.map((exerciseId) => updateExercise(exerciseId))
    )

    return "OK"
  })

export default updateWorkoutPlan
