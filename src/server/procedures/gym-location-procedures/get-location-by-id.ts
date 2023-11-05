import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { z } from "zod"

const getLocationById = tProtectedProcedure
  .input(z.string().min(1))
  .query(async ({ input: gymId, ctx: { user } }) => {
    try {
      const gymLocation = await prisma.gymLocation.findUniqueOrThrow({
        where: {
          gymId,
          userId: user.id,
        },
      })

      return gymLocation
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error getting single gym location.",
        cause: error,
      })
    }
  })

export default getLocationById
