import React from "react"
import { GetExercisesOutput } from "src/types/trpc/router-types"
import PrimaryButton from "../UI/PrimaryButton"

interface ViewExerciseProps {
  exercise: GetExercisesOutput[number]
  onClose: () => void
}

export default function ViewExercise({
  exercise: { name, url, description },
  onClose,
}: ViewExerciseProps) {
  return (
    <div className="flex flex-col gap-2">
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Link:</strong> {url}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <PrimaryButton
        label="Close"
        onClick={onClose}
        className="self-end px-4 py-2"
        type="button"
      />
    </div>
  )
}
