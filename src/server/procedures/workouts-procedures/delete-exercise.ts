import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import { z } from "zod"
import prisma from "src/utils/prisma"

const deleteExercise = tProtectedProcedure
  .input(z.string().uuid())
  .mutation(async ({ input: exerciseId, ctx }) => {
    try {
      const workoutPlans = await prisma.workoutPlan.findMany({
        where: {
          userId: ctx.user.id,
        },
      })

      const isExerciseInWorkoutPlan = workoutPlans?.some((workoutPlan) =>
        workoutPlan.exerciseOrder.includes(exerciseId)
      )

      if (isExerciseInWorkoutPlan) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Exercise is in use in workout plans.",
        })
      }

      const exercise = await prisma.exercise.delete({
        where: {
          exerciseId,
        },
      })
      return exercise
    } catch (error) {
      console.error("Error deleting exercise.")
      console.error(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error deleting exercise.",
        cause: error,
      })
    }
  })

export default deleteExercise
