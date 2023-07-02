import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import { z } from "zod"
import prisma from "src/utils/prisma"

const deleteExercise = tProtectedProcedure
  .input(z.string().uuid())
  .mutation(async ({ input: exerciseId }) => {
    try {
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
