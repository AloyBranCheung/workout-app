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

    // hashmaps
    const runIdsArr: string[] = []
    const sessionIdsArr: string[] = []
    for (const activity of activities) {
      if (activity?.runId) {
        runIdsArr.push(activity.runId)
      }
      if (activity?.sessionId) {
        sessionIdsArr.push(activity.sessionId)
      }
    }
    const runs = await prisma.run.findMany({
      where: {
        runId: {
          in: runIdsArr,
        },
      },
    })
    const runsHash = (() => {
      const hash: Record<
        string,
        {
          runId: string
          updatedAt: Date
          createdAt: Date
          duration: number
          speed: number
          speedUnits: string
          speedPerTimeUnit: string
          actualDistance: number
          actualDistanceUnits: string
          note: string | null
          exerciseId: string
        }
      > = {}
      for (const run of runs) {
        if (!(run.runId in hash)) {
          hash[run.runId] = run
        }
      }
      return hash
    })()

    const sessions = await prisma.session.findMany({
      where: {
        sessionId: {
          in: sessionIdsArr,
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

    const workoutPlanIdsArr = []
    for (const session of sessions) {
      if (session?.planId) {
        workoutPlanIdsArr.push(session.planId)
      }
    }

    const workoutPlans = await prisma.workoutPlan.findMany({
      where: {
        planId: {
          in: workoutPlanIdsArr,
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
        let session
        let duration = 0
        let workoutName = ""
        if (activity?.sessionId) {
          session = sessionsHash[activity.sessionId]
          if (session?.endDuration) {
            duration =
              session.endDuration.getTime() - session.startDuration.getTime()
          }
          workoutName =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            workoutPlansHash[sessionsHash[activity.sessionId].planId!].name
        } else {
          if (activity?.runId) {
            session = runsHash[activity.runId]
            duration = session.duration
            workoutName = `Run ${
              workoutPlansHash[runsHash[activity.runId].actualDistance]
            }${workoutPlansHash[runsHash[activity.runId].actualDistanceUnits]}`
          }
        }

        arr.push({
          date: activity.createdAt.toISOString(),
          id: activity.activityId,
          workoutName,
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
