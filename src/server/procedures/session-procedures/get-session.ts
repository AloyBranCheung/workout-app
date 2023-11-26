import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { z } from "zod"

const getSession = tProtectedProcedure
  .input(z.string())
  .query(async ({ input }) => {
    try {
      const session = await prisma.session.findUnique({
        where: {
          sessionId: input,
        },
        include: {
          workoutPlan: {
            include: {
              exercises: true,
            },
          },
        },
      })
      return session
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
        cause: error,
      })
    }
  })

export default getSession
