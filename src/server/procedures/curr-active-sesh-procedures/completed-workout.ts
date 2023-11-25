import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import { CompletedSetsSchema } from "src/validators/curr-active-exercises-schema"

const completedWorkout = tProtectedProcedure
  .input(CompletedSetsSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    console.log("input", input)
    return "Ok"
  })

export default completedWorkout
