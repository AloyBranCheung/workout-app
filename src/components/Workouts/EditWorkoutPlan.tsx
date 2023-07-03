import React, { useMemo } from "react"
import { z } from "zod"
// react-hook-forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// types/utils
import { GetWorkoutPlansOutput } from "src/types/trpc/router-types"
import { UpdatePlanSchema } from "src/validators/workout-schema"
// components
import Text from "../UI/typography/Text"
import FormInput from "../UI/FormInput"

interface EditWorkoutPlanProps {
  workoutPlan: GetWorkoutPlansOutput[number]
}

export default function EditWorkoutPlan({ workoutPlan }: EditWorkoutPlanProps) {
  const { exerciseOrder, exerciseObj: exercises } = useMemo(() => {
    const exerciseOrder = []
    const exerciseObj: z.infer<typeof UpdatePlanSchema>["exercises"] = {}
    for (const target of workoutPlan.targets) {
      exerciseOrder.push(target.exerciseId)
      exerciseObj[target.exerciseId] = {
        reps: target.targetReps.toString(),
        sets: target.targetSets.toString(),
      }
    }
    return { exerciseOrder, exerciseObj }
  }, [workoutPlan])

  const { control } = useForm<z.infer<typeof UpdatePlanSchema>>({
    resolver: zodResolver(UpdatePlanSchema),
    defaultValues: {
      name: workoutPlan.name,
      planId: workoutPlan.planId,
      exerciseOrder,
      exercises,
    },
  })
  return (
    <div className="flex flex-col gap-4">
      <Text text={`Editing ${workoutPlan.name}`} className="text-p1" bold />
      <form>
        <FormInput name="name" control={control} />
      </form>
    </div>
  )
}
