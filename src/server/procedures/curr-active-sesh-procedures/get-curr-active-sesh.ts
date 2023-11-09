import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"

const getCurrActiveSesh = tProtectedProcedure.query(
  async ({ ctx: { user } }) => {
    try {
      const currActiveSesh = await prisma.currActiveSesh.findUnique({
        where: {
          userId: user.id,
        },
      })
      return currActiveSesh
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error getting current active sesh.",
        cause: error,
      })
    }
  }
)

export default getCurrActiveSesh
