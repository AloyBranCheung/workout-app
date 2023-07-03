import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import WorkoutPlanSchema from "src/validators/workout-schema"

const addWorkoutPlan = tProtectedProcedure
  .input(WorkoutPlanSchema)
  .mutation(
    async ({ input: { name, exerciseOrder, exercises }, ctx: { user } }) => {
      try {
        const exerciseIdArr = Object.keys(exercises)
        // create workoutplan
        const workoutPlan = await prisma.workoutPlan.create({
          data: {
            name,
            exerciseOrder,
            exercises: {
              connect: exerciseIdArr.map((exerciseId) => ({ exerciseId })),
            },
            user: {
              connect: {
                userId: user.id,
              },
            },
          },
        })

        const targetExercise = async (exerciseId: string) => {
          await prisma.target.create({
            data: {
              targetReps: Number(exercises[exerciseId].reps),
              targetSets: Number(exercises[exerciseId].sets),
              exerciseId,
              planId: workoutPlan.planId,
            },
          })
        }

        const updatedExercises = await Promise.all(
          exerciseIdArr.map((exerciseId) => targetExercise(exerciseId))
        )

        return { workoutPlan, updatedExercises }
      } catch (error) {
        console.error("Error adding workoutplan.")
        console.error(error)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error adding workoutplan.",
          cause: error,
        })
      }
    }
  )
export default addWorkoutPlan
