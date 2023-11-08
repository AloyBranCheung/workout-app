import { TRPCError } from "@trpc/server"
import { tProtectedProcedure } from "src/server/trpc"
import prisma from "src/utils/prisma"
import WorkoutPlanSchema from "src/validators/workout-schema"

const addWorkoutPlan = tProtectedProcedure
  .input(WorkoutPlanSchema)
  .mutation(
    async ({
      input: { name, exerciseOrder, exercises, gymLocation },
      ctx: { user },
    }) => {
      try {
        const exerciseIdArr = Object.keys(exercises)
        // create workoutplan
        await prisma.workoutPlan.create({
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
            gymLocation: {
              connect: {
                gymId: gymLocation.name,
              },
            },
          },
        })

        const updateExerciseTargets = async (exerciseId: string) => {
          const { reps, sets } = exercises[exerciseId]
          await prisma.exercise.update({
            where: {
              exerciseId,
            },
            data: {
              targetReps: Number(reps),
              targetSets: Number(sets),
            },
          })
        }

        await Promise.all(
          exerciseIdArr.map((exerciseId) => updateExerciseTargets(exerciseId))
        )

        return "Ok"
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
