import React, { useEffect, useMemo } from "react"
import { z } from "zod"
// react-hook-forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// hooks
import useDragSorting from "src/hooks/useDragSorting"
// types/utils
import { GetWorkoutPlansOutput } from "src/types/trpc/router-types"
import { UpdatePlanSchema } from "src/validators/workout-schema"
import exerciseHash from "src/utils/exercises-hashmap"
// components
import Text from "../UI/typography/Text"
import FormInput from "../UI/FormInput"
import BorderCard from "../UI/BorderCard"
import DragSortable from "../UI/DragSortable"
import ExerciseCard from "../CreateWorkout/ExerciseCard"
import YesNoBtnGroup from "../UI/YesNoBtnGroup"

interface EditWorkoutPlanProps {
  workoutPlan: GetWorkoutPlansOutput[number]
  onClose: () => void
}

export default function EditWorkoutPlan({
  workoutPlan,
  onClose,
}: EditWorkoutPlanProps) {
  const {
    exerciseOrder,
    exerciseObj: exercises,
    exerciseHashmap,
  } = useMemo(() => {
    const exerciseHashmap = exerciseHash(
      workoutPlan.targets.map((target) => target.exercise)
    )
    const exerciseOrder = []
    const exerciseObj: z.infer<typeof UpdatePlanSchema>["exercises"] = {}
    for (const target of workoutPlan.targets) {
      exerciseOrder.push(target.exerciseId)
      exerciseObj[target.exerciseId] = {
        reps: target.targetReps.toString(),
        sets: target.targetSets.toString(),
      }
    }
    return { exerciseOrder, exerciseObj, exerciseHashmap }
  }, [workoutPlan])

  const { items, verticalListSortingStrategy, handleDragEnd } =
    useDragSorting(exerciseOrder)

  const { control, handleSubmit, setValue } = useForm<
    z.infer<typeof UpdatePlanSchema>
  >({
    resolver: zodResolver(UpdatePlanSchema),
    defaultValues: {
      name: workoutPlan.name,
      planId: workoutPlan.planId,
      exerciseOrder,
      exercises,
    },
  })

  const handleSubmitForm = (data: z.infer<typeof UpdatePlanSchema>) =>
    console.log("data", data)

  useEffect(() => {
    setValue("exerciseOrder", items as string[])
  }, [items, setValue])

  return (
    <div className="flex flex-col gap-4">
      <Text text={`Editing ${workoutPlan.name}`} className="text-p1" bold />
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormInput name="name" control={control} />
        <BorderCard>
          <DragSortable
            items={items}
            sortingStrategy={verticalListSortingStrategy}
            onDragEnd={handleDragEnd}
          >
            {items.map((itemId) => (
              <ExerciseCard<z.infer<typeof UpdatePlanSchema>>
                exerciseId={itemId.toString()}
                key={itemId}
                control={control}
                exerciseName={exerciseHashmap[itemId].name}
                setsName={`exercises.${itemId}.sets`}
                repsName={`exercises.${itemId}.reps`}
              />
            ))}
          </DragSortable>
          <YesNoBtnGroup
            confirmBtnType="submit"
            confirmText="Update"
            declineText="Cancel"
            declineBtnType="button"
            onClickDecline={onClose}
          />
        </BorderCard>
      </form>
    </div>
  )
}
