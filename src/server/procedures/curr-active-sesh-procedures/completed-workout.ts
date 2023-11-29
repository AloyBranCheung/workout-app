import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { CompletedSetsSchema } from "src/validators/curr-active-exercises-schema"

const completedWorkout = tProtectedProcedure
  .input(CompletedSetsSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const endDate = new Date()
      const endDateISO = new Date().toISOString()
      const sessionId = input[0].sessionId

      // close session (add end duration)
      const updatedSession = await prisma.session.update({
        where: {
          sessionId,
        },
        data: {
          endDuration: endDateISO,
        },
      })

      const workoutPlanId = updatedSession.planId
      const duration =
        endDate.getTime() - updatedSession.startDuration.getTime()

      // update Set table, want to input in order for delay one at a time so that the latest set is the most recent weight
      const sortedInput = input.sort((a, b) => {
        if (a.setNumber > b.setNumber) {
          return 1
        }
        if (a.setNumber < b.setNumber) {
          return -1
        }
        return 0
      })

      const setsToInput = sortedInput.map((obj) => ({
        weight: Number(obj.weight),
        unit: obj.unit,
        reps: Number(obj.reps),
        sessionId,
        exerciseId: obj.exerciseId,
        setNumber: obj.setNumber,
      }))

      const createSet = async (data: {
        weight: number
        unit: string
        reps: number
        sessionId: string
        exerciseId: string
      }) => {
        await prisma.set.create({
          data,
        })
      }

      for await (const set of setsToInput) {
        await createSet(set)
      }

      // close curractivesesh (delete by userid)
      await prisma.currActiveSesh.delete({
        where: {
          userId: user.id,
        },
      })

      if (workoutPlanId) {
        await prisma.workoutPlan.update({
          where: {
            planId: workoutPlanId,
          },
          data: {
            lastWorkout: endDateISO,
            duration,
          },
        })
      }

      return "OK"
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error completing workout.",
        cause: error,
      })
    }
  })

export default completedWorkout
