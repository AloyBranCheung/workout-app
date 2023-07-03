import { tProtectedProcedure } from "src/server/trpc"
import { z } from "zod"
import prisma from "src/utils/prisma"

const deleteWorkout = tProtectedProcedure
  .input(z.string().uuid())
  .mutation(async ({ input: planId }) => {
    const deletedPlan = await prisma.workoutPlan.delete({
      where: {
        planId,
      },
    })
    return deletedPlan
  })

export default deleteWorkout
