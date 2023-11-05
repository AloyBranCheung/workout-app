import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { AddGymLocationSchema } from "src/validators/workout-schema"

const addGymLocation = tProtectedProcedure
  .input(AddGymLocationSchema)
  .mutation(async ({ input: { name, description }, ctx: { user } }) => {
    try {
      const gymLocation = prisma.gymLocation.create({
        data: {
          name,
          description,
          user: {
            connect: {
              userId: user.id,
            },
          },
        },
      })
      return gymLocation
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error adding gym location.",
        cause: error,
      })
    }
  })

export default addGymLocation
