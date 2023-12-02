import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { z } from "zod"
import type { Set, Exercise } from "@prisma/client"

const getActivityById = tProtectedProcedure
  .input(
    z
      .object({
        activityId: z.string().optional(),
      })
      .optional()
  )
  .query(async ({ input, ctx }) => {
    if (!input?.activityId) return []

    try {
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
              workoutPlan: true,
            },
          },
        },
      })

      // sort sets by workout exercise order, need to display: exercise name, set number, weight, weight type, reps
      const exerciseOrder = activity?.session?.workoutPlan?.exerciseOrder

      type SetExercise = Set & { exercise: Exercise }
      const exerciseHash = (() => {
        const hash: {
          [key: string]: SetExercise[]
        } = {}

        if (!activity?.session?.sets) return hash

        for (const set of activity.session.sets) {
          if (!(set.exerciseId in hash)) {
            hash[set.exerciseId] = [set]
          } else {
            hash[set.exerciseId].push(set)
          }
        }
        return hash
      })()

      return { exerciseOrder, exerciseHash }
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Activities not found",
        cause: error,
      })
    }
  })

export default getActivityById
