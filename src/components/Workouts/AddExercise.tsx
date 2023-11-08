import React from "react"
import BorderCard from "../UI/BorderCard"
import SecondaryCard from "../UI/SecondaryCard"
import PrimaryButton from "../UI/PrimaryButton"
import Text from "../UI/typography/Text"

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
  const exerciseList = gymSpecificExercises.map((exercise) => (
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
  ))

  return (
    <BorderCard>
      <div className="flex flex-col gap-2">
        {exerciseList.length > 0 ? (
          exerciseList
        ) : (
          <Text text="Add more exercises in exercies page." />
        )}
      </div>
    </BorderCard>
  )
}
