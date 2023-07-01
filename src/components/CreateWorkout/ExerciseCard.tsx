import React from "react"
import { Control, FieldValues } from "react-hook-form"
// components
import DragIcon from "../UI/icons/DragIcon"
import SecondaryCard from "../UI/SecondaryCard"
import Text from "../UI/typography/Text"
import FormInput from "../UI/FormInput"

interface ExerciseCardProps {
  exerciseName: string
  control: Control<FieldValues>
  setsName: string
  repsName: string
}

export default function ExerciseCard({
  exerciseName,
  control,
  setsName,
  repsName,
}: ExerciseCardProps) {
  return (
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
  )
}
