import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { z } from "zod"

const getActivityById = tProtectedProcedure
  .input(
    z
      .object({
        activityId: z.string().optional(),
      })
      .optional()
  )
  .query(async ({ input, ctx }) => {
    try {
      if (input?.activityId) {
        const activity = await prisma.activity.findUnique({
          where: {
            activityId: input?.activityId,
            userId: ctx.user.id,
          },
          include: {
            session: {
              include: {
                sets: {
                  include: {
                    exercise: true,
                  },
                },
              },
            },
          },
        })
        return activity
      } else {
        const activities = await prisma.activity.findMany({
          where: {
            userId: ctx.user.id,
          },
        })
        return activities
      }
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Activities not found",
        cause: error,
      })
    }
  })

export default getActivityById
