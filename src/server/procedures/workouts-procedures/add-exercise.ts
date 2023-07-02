import { tProtectedProcedure } from "src/server/trpc"
import AddExerciseSchema from "src/validators/add-exercise-schema"
import { TRPCError } from "@trpc/server"
import prisma from "src/utils/prisma"

const addExercise = tProtectedProcedure
  .input(AddExerciseSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const exercise = await prisma.exercise.create({
        data: {
          name: input.name,
          description: input.description,
          url: input?.url ?? "",
          user: {
            connect: {
              userId: user.id,
            },
          },
        },
      })
      return exercise
    } catch (error) {
      console.error("Error adding exercise")
      console.error(error)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error adding exercise",
        cause: error,
      })
    }
  })

export default addExercise
