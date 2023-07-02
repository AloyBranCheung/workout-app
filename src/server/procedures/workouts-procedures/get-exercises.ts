import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"

const getExercises = tProtectedProcedure.query(async ({ ctx: { user } }) => {
  try {
    const exercises = await prisma.exercise.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        name: "asc",
      },
    })
    return exercises
  } catch (error) {
    console.error("Error getting exercises for user.")
    console.error(error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error getting exercises for user.",
      cause: error,
    })
  }
})

export default getExercises
