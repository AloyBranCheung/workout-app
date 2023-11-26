import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
// types
import { IRecentActivity } from "src/types/home-page"
// mocks
import { MOCK_TOP_STATS } from "src/mocks/recent-activity"

const getStats = tProtectedProcedure.query(async ({ ctx: { user } }) => {
  try {
    const activities = await prisma.activity.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    })

    const sessions = await prisma.session.findMany({
      where: {
        sessionId: {
          in: activities.map((activity) => activity.sessionId),
        },
      },
    })
    const sessionsHash = (() => {
      const hash: Record<
        string,
        {
          sessionId: string
          updatedAt: Date
          createdAt: Date
          startDuration: Date
          endDuration: Date | null
          planId: string | null
          userId: string
        }
      > = {}
      for (const session of sessions) {
        if (!(session.sessionId in hash)) {
          hash[session.sessionId] = session
        }
      }
      return hash
    })()

    const workoutPlans = await prisma.workoutPlan.findMany({
      where: {
        planId: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          in: sessions.map((session) => session.planId!),
        },
      },
    })
    const workoutPlansHash = (() => {
      const hash: Record<
        string,
        {
          planId: string
          updatedAt: Date
          createdAt: Date
          name: string
          exerciseOrder: string[]
          lastWorkout: Date | null
          duration: number | null
          userId: string
          gymId: string
        }
      > = {}
      for (const workoutPlan of workoutPlans) {
        if (!(workoutPlan.planId in hash)) {
          hash[workoutPlan.planId] = workoutPlan
        }
      }
      return hash
    })()

    const recentActivity = (() => {
      const arr: IRecentActivity[] = []
      for (const activity of activities) {
        const session = sessionsHash[activity.sessionId]
        const duration =
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          session.endDuration!.getTime() - session.startDuration.getTime()

        arr.push({
          date: activity.createdAt.toISOString(),
          id: activity.activityId,
          workoutName:
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            workoutPlansHash[sessionsHash[activity.sessionId].planId!].name,
          workoutDuration: duration,
        })
      }
      return arr
    })()

    return { recentActivity: recentActivity, topStats: MOCK_TOP_STATS }
  } catch (error) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No activities found.",
      cause: error,
    })
  }
})

export default getStats
