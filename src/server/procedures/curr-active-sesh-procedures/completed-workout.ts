import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { CompletedSetsSchema } from "src/validators/curr-active-exercises-schema"

const completedWorkout = tProtectedProcedure
  .input(CompletedSetsSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const sessionId = input[0].sessionId
      // close session (add end duration)
      await prisma.session.update({
        where: {
          sessionId,
        },
        data: {
          endDuration: new Date().toISOString(),
        },
      })

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
