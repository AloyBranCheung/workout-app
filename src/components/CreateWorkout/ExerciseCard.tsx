import React from "react"
// react-hook-form
import { Control, FieldValues, Path } from "react-hook-form"
// dnd
import { useSortable } from "@dnd-kit/sortable"
// components
import DragIcon from "../UI/icons/DragIcon"
import SecondaryCard from "../UI/SecondaryCard"
import Text from "../UI/typography/Text"
import FormInput from "../UI/FormInput"
import WorkoutPlanSchema, {
  UpdatePlanSchema,
} from "src/validators/workout-schema"
import { z } from "zod"

interface ExerciseCardProps<
  T extends z.infer<typeof UpdatePlanSchema> | z.infer<typeof WorkoutPlanSchema>
> {
  exerciseId: string
  exerciseName: string
  control: Control<FieldValues & T>
  setsName: Path<FieldValues & T>
  repsName: Path<FieldValues & T>
}

export default function ExerciseCard<
  T extends z.infer<typeof UpdatePlanSchema> | z.infer<typeof WorkoutPlanSchema>
>({
  exerciseId,
  exerciseName,
  control,
  setsName,
  repsName,
}: ExerciseCardProps<T>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: exerciseId })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${
          transform.scaleX - 0.05
        }) scaleY(${transform.scaleY - 0.05})`
      : undefined,
    transition,
    touchAction: "none",
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SecondaryCard className="p-3 flex items-center gap-4">
        <DragIcon />
        <div className="flex flex-col gap-3">
          <Text text={`Name: ${exerciseName}`} bold />
          <div className="flex items-center gap-4">
            <FormInput
              control={control}
              label="Sets"
              name={setsName}
              type="number"
              inputClassName="text-center"
            />
            <FormInput
              control={control}
              label="Reps"
              name={repsName}
              type="number"
              inputClassName="text-center"
            />
          </div>
        </div>
      </SecondaryCard>
    </div>
  )
}
