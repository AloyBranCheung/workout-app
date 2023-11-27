import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
// utils
import JsDateUtils from "src/utils/js-date-utils"
import { lbsToKg } from "src/utils/unit-conversion"
import unixToIsoDate from "src/utils/unix-to-ISO-date"
// types
import { IRecentActivity, ITopStats, RechartsData } from "src/types/home-page"
import Units from "src/constants/units"

const getStats = tProtectedProcedure.query(async ({ ctx: { user } }) => {
  try {
    const activities = await prisma.activity.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    /* -------------------------------------------------------------------------- */
    /*                                 processing                                 */
    /* -------------------------------------------------------------------------- */
    const last5Activities = activities.slice(0, 5)

    // idsArr
    const runIdsArr: string[] = []
    const sessionIdsArr: string[] = []
    for (const activity of last5Activities) {
      if (activity?.runId) {
        runIdsArr.push(activity.runId)
      }
      if (activity?.sessionId) {
        sessionIdsArr.push(activity.sessionId)
      }
    }

    // runs
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

    // sessions
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

    // workout plans
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

    /* -------------------------------------------------------------------------- */
    /*                                   Output                                   */
    /* -------------------------------------------------------------------------- */
    /* ----------------------------- recent activity ---------------------------- */
    const recentActivity = (() => {
      const arr: IRecentActivity[] = []
      for (const activity of last5Activities) {
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

    /* -------------------------------- top stats ------------------------------- */
    // weight lifted total this week
    const startOfThisWeek = new JsDateUtils(new Date()).getStartOfWeek()
    const setsThisWeek = await prisma.set.findMany({
      where: {
        AND: [
          {
            unit: {
              in: [Units.KG, Units.LB],
            },
          },
          {
            createdAt: {
              gte: startOfThisWeek.toISOString(),
            },
          },
        ],
      },
    })

    let totalKgLiftedThisWeek = 0
    for (const set of setsThisWeek) {
      if (set.unit === Units.LB) {
        set.unit = Units.KG
        set.weight = lbsToKg(set.weight)
      }
      totalKgLiftedThisWeek += set.weight
    }

    // top 3 lifts?
    const allExercises = await prisma.exercise.findMany({
      where: {
        userId: user.id,
      },
    })
    const exerciseHash = (() => {
      const hash: Record<
        string,
        {
          exerciseId: string
          updatedAt: Date
          createdAt: Date
          name: string
          description: string | null
          url: string | null
          unit: string
          targetReps: number | null
          targetSets: number | null
          userId: string
          gymId: string
        }
      > = {}
      for (const exercise of allExercises) {
        if (!(exercise.exerciseId in hash)) {
          hash[exercise.exerciseId] = exercise
        }
      }
      return hash
    })()

    const allSets = await prisma.set.findMany({
      where: {
        unit: {
          in: [Units.KG, Units.LB],
        },
      },
      orderBy: {
        weight: "desc",
      },
    })
    const convertedToKg = allSets.map((set) => {
      if (set.unit === Units.LB) {
        set.unit = Units.KG
        set.weight = lbsToKg(set.weight)
      }
      return set
    })
    const distinctExerciseId = new Set()
    const top3Arr = convertedToKg
      .filter((set) => {
        if (!distinctExerciseId.has(set.exerciseId)) {
          distinctExerciseId.add(set.exerciseId)
          return true
        }
        return false
      })
      .slice(0, 3)

    const big3: ITopStats["big3"] = {}
    for (const set of top3Arr) {
      if (set.exerciseId in exerciseHash) {
        big3[exerciseHash[set.exerciseId].name] = {
          weight: set.weight,
          unit: set.unit as Units,
        }
      }
    }

    // random graph for random lift
    const distinctSets = await prisma.set.findMany({
      where: {
        unit: {
          in: [Units.KG, Units.LB],
        },
      },
      distinct: ["weight"],
    })

    const exercises = await prisma.exercise.findMany({
      where: {
        userId: user.id,
      },
      select: {
        exerciseId: true,
        name: true,
        unit: true,
      },
    })

    const randomExercise = (): ITopStats["randomGraph"] => {
      if (exercises.length < 1)
        return { data: [], exerciseName: "", unit: Units.KG }

      const ranSelected =
        exercises[Math.floor(Math.random() * exercises.length)]

      const randExerciseSets = distinctSets.filter(
        (set) => set.exerciseId === ranSelected.exerciseId
      )
      if (randExerciseSets.length > 0) {
        const data = randExerciseSets.map(
          (obj): RechartsData => ({
            name: unixToIsoDate(obj.createdAt.getTime()),
            weight:
              ranSelected.unit === Units.KG ? obj.weight : lbsToKg(obj.weight),
          })
        )
        return {
          data,
          exerciseName: ranSelected.name,
          unit: Units.KG,
        }
      }
      return randomExercise()
    }

    // response
    const topStatsRes: ITopStats = {
      weightLiftedTotal: {
        weight: Number(totalKgLiftedThisWeek.toFixed(2)),
        unit: Units.KG,
      },
      randomGraph: randomExercise(),
      big3,
    }

    return { recentActivity: recentActivity, topStats: topStatsRes }
  } catch (error) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No activities found.",
      cause: error,
    })
  }
})

export default getStats
