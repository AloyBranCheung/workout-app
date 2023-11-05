import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
// types
import { UpdateGymLocationSchema } from "src/validators/gym-location-schema"

const updateGymLocationById = tProtectedProcedure
  .input(UpdateGymLocationSchema)
  .mutation(async ({ input: { description, gymId, name }, ctx: { user } }) => {
    try {
      const gymLocation = await prisma.gymLocation.update({
        where: {
          gymId,
          userId: user.id,
        },
        data: {
          description,
          gymId,
          name,
        },
      })

      return gymLocation
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error updating gym location.",
        cause: error,
      })
    }
  })

export default updateGymLocationById
