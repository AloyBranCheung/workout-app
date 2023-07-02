import { tProtectedProcedure } from "src/server/trpc"
import UpdateExerciseSchema from "src/validators/update-exercise-schema"
import prisma from "src/utils/prisma"
import { TRPCError } from "@trpc/server"

const updateExercise = tProtectedProcedure
  .input(UpdateExerciseSchema)
  .mutation(async ({ input }) => {
    try {
      const updatedExercise = await prisma.exercise.update({
        where: {
          exerciseId: input.exerciseId,
        },
        data: input,
      })
      return updatedExercise
    } catch (error) {
      console.error("Error updating exercise")
      console.error(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error updating exercise",
        cause: error,
      })
    }
  })

export default updateExercise
