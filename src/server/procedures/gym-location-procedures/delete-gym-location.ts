import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { z } from "zod"

const deleteGymLocation = tProtectedProcedure
  .input(
    z.object({
      gymId: z.string().min(1),
    })
  )
  .mutation(async ({ input: { gymId } }) => {
    try {
      await prisma.gymLocation.delete({
        where: {
          gymId,
        },
      })
      return "Ok"
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error deleting gym location.",
        cause: error,
      })
    }
  })

export default deleteGymLocation
