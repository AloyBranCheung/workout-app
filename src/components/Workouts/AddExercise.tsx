import React from "react"
import BorderCard from "../UI/BorderCard"
import SecondaryCard from "../UI/SecondaryCard"
import PrimaryButton from "../UI/PrimaryButton"

interface AddExerciseProps {
  gymSpecificExercises: {
    userId: string
    createdAt: string
    updatedAt: string
    name: string
    gymLocations: {
      name: string
      gymId: string
    }
    url: string | null
    description: string | null
    gymId: string
    unit: string
    exerciseId: string
  }[]
  onClickAdd: (exerciseId: string) => void
}

export default function AddExercise({
  gymSpecificExercises,
  onClickAdd,
}: AddExerciseProps) {
  return (
    <BorderCard>
      <div className="flex flex-col gap-2">
        {gymSpecificExercises.map((exercise) => (
          <SecondaryCard
            key={exercise.exerciseId}
            className="flex justify-between items-center"
          >
            <div>{exercise.name}</div>
            <PrimaryButton
              label="Add"
              type="button"
              className="p-2 py-0"
              onClick={() => onClickAdd(exercise.exerciseId)}
            />
          </SecondaryCard>
        ))}
      </div>
    </BorderCard>
  )
}
