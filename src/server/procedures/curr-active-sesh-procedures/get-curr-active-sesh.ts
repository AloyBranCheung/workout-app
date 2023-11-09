import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { z } from "zod"

const getCurrActiveSesh = tProtectedProcedure
  .input(z.object({ workoutPlanId: z.string().optional() }))
  .query(async ({ input: { workoutPlanId }, ctx: { user } }) => {
    try {
      let currActiveSesh = await prisma.currActiveSesh.findUnique({
        where: {
          userId: user.id,
        },
        include: {
          session: {
            include: {
              workoutPlan: true,
            },
          },
        },
      })

      // if no active workout session, create one
      if (!currActiveSesh && workoutPlanId) {
        const newActivity = await prisma.activity.create({
          data: {
            userId: user.id,
          },
        })

        const newSession = await prisma.session.create({
          data: {
            planId: workoutPlanId,
            activityId: newActivity.activityId,
          },
        })

        currActiveSesh = await prisma.currActiveSesh.create({
          data: {
            sessionId: newSession.sessionId,
            userId: user.id,
          },
          include: {
            session: {
              include: {
                workoutPlan: true,
                sets: true,
              },
            },
          },
        })
      }

      return currActiveSesh
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error getting current active sesh.",
        cause: error,
      })
    }
  })

export default getCurrActiveSesh
