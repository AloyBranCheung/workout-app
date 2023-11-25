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

      // update Set table
      const setsToInput = input.map((obj) => ({
        weight: Number(obj.weight),
        unit: obj.unit,
        reps: Number(obj.reps),
        sessionId,
        exerciseId: obj.exerciseId,
      }))

      await prisma.set.createMany({
        data: setsToInput,
      })

      // close curractivesesh (delete by userid)
      await prisma.currActiveSesh.delete({
        where: {
          userId: user.id,
        },
      })
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error completing workout.",
        cause: error,
      })
    }
  })

export default completedWorkout
