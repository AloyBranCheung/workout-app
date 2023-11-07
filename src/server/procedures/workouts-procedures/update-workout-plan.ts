import { tProtectedProcedure } from "src/server/trpc"
import { UpdatePlanSchema } from "src/validators/workout-schema"
import prisma from "src/utils/prisma"

const updateWorkoutPlan = tProtectedProcedure
  .input(UpdatePlanSchema)
  .mutation(async ({ input: { name, exercises, exerciseOrder, planId } }) => {
    const updatedWorkoutPlan = await prisma.workoutPlan.update({
      where: {
        planId,
      },
      data: {
        name,
        exerciseOrder: {
          set: exerciseOrder,
        },
      },
    })

    // get targetId to update from exercises object
    const targetHash: { [targetId: string]: (typeof exercises)[string] } = {}
    const targetIdArr = []
    const newTargets = []
    for (const exerciseId of Object.keys(exercises)) {
      const exerciseObj = exercises[exerciseId]
      if (exerciseObj?.targetId) {
        if (!(exerciseObj.targetId in targetHash)) {
          targetHash[exerciseObj.targetId] = exerciseObj
          targetIdArr.push(exerciseObj.targetId)
        }
      } else {
        newTargets.push({
          targetReps: exerciseObj.reps,
          targetSets: exerciseObj.sets,
          exerciseId,
          planId,
        })
      }
    }

    // use Promise.all to update all targets
    const updateTarget = async (targetId: string) => {
      const updatedTarget = await prisma.target.update({
        where: {
          targetId,
        },
        data: {
          targetReps: Number(targetHash[targetId].reps),
          targetSets: Number(targetHash[targetId].sets),
        },
      })
      return updatedTarget
    }

    const createNewTarget = async ({
      targetReps,
      targetSets,
      exerciseId,
      planId,
    }: {
      targetReps: string
      targetSets: string
      exerciseId: string
      planId: string
    }) => {
      await prisma.target.create({
        data: {
          targetReps: Number(targetReps),
          targetSets: Number(targetSets),
          exerciseId,
          planId,
        },
      })
    }

    const updatedTargets = await Promise.all(
      targetIdArr.map((targetId) => updateTarget(targetId))
    )

    const createdTargets = await Promise.all(
      newTargets.map((targetObj) => createNewTarget(targetObj))
    )

    return { updatedWorkoutPlan, updatedTargets, createdTargets }
  })

export default updateWorkoutPlan
