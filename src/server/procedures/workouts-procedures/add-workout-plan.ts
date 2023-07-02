import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import WorkoutPlanSchema from "src/validators/add-workout-schema"

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

        const updateExercise = async (exerciseId: string) => {
          const updatedExerciseObj = await prisma.exercise.update({
            where: {
              exerciseId,
            },
            data: {
              targetSets: Number(exercises[exerciseId].sets),
              targetReps: Number(exercises[exerciseId].reps),
            },
          })
          return updatedExerciseObj
        }

        const updatedExercises = await Promise.all(
          exerciseIdArr.map((exerciseId) => updateExercise(exerciseId))
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
