import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"

const getWorkoutPlans = tProtectedProcedure.query(async ({ ctx: { user } }) => {
  try {
    const workoutPlans = await prisma.workoutPlan.findMany({
      where: {
        userId: user.id,
      },
    })
    return workoutPlans
  } catch (error) {
    console.error("Error getting workoutplans")
    console.error(error)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error getting workoutplans",
      cause: error,
    })
  }
})

export default getWorkoutPlans
