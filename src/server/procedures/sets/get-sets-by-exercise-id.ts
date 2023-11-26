import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { z } from "zod"

const getSetsByExerciseId = tProtectedProcedure
  .input(z.string().uuid())
  .query(async ({ input }) => {
    try {
      const sets = await prisma.set.findMany({
        where: {
          exerciseId: input,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      return sets
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Something went wrong",
        cause: error,
      })
    }
  })

export default getSetsByExerciseId
