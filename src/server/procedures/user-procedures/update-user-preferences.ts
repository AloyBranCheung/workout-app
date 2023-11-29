import { tProtectedProcedure } from "src/server/trpc"
import { TRPCError } from "@trpc/server"
import prisma from "src/utils/prisma"
// validator
import UserProfileSchema from "src/validators/user-profile"

const updateUserPreferences = tProtectedProcedure
  .input(UserProfileSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      await prisma.profile.upsert({
        where: {
          userId: ctx.user.id,
        },
        update: {
          restTimer: input?.restTimer,
        },
        create: {
          user: {
            connect: {
              userId: ctx.user.id,
            },
          },
          restTimer: input?.restTimer,
        },
      })
      return "OK"
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
        message: "Error updating user profile",
      })
    }
  })

export default updateUserPreferences
