import React from "react"
// components
import PrimaryButton from "../UI/PrimaryButton"
import SecondaryButton from "../UI/SecondaryButton"
import Text from "../UI/typography/Text"
import ParentCard from "../UI/ParentCard"
import SecondaryCard from "../UI/SecondaryCard"
import EditIcon from "../UI/icons/EditIcon"
import TrashIcon from "../UI/icons/TrashIcon"
// types
import { GetExercisesOutput } from "src/types/trpc/router-types"
import InspectIcon from "../UI/icons/InspectIcon"

interface ExercisesProps {
  exercises: GetExercisesOutput | undefined
}

export default function Exercises({ exercises }: ExercisesProps) {
  return (
    <div className="flex flex-col gap-10">
      <PrimaryButton label="add an exercise" type="button" className="w-full" />
      <div>
        <Text text="My Exercises" className="text-h3" />
        <ParentCard>
          {exercises && exercises.length > 1 ? (
            exercises.map(({ exerciseId, name }) => (
              <SecondaryCard
                key={exerciseId}
                className="flex justify-between items-center"
              >
                <Text text={name} className="text-p2" bold />
                <div className="flex gap-2 items-center justify-end">
                  <InspectIcon onClick={() => console.log("clicked")} />
                  <EditIcon onClick={() => console.log("clicked")} />
                  <TrashIcon onClick={() => console.log("clicked")} />
                </div>
              </SecondaryCard>
            ))
          ) : (
            <SecondaryButton label="Get Started" type="button" />
          )}
        </ParentCard>
      </div>
    </div>
  )
}
