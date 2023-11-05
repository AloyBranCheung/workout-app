import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"

const getGymLocations = tProtectedProcedure.query(async ({ ctx: { user } }) => {
  try {
    const gymLocations = await prisma.gymLocation.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        name: "asc",
      },
    })

    return gymLocations
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error getting exercises for user.",
      cause: error,
    })
  }
})

export default getGymLocations
