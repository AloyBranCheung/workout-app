import React from "react"
import { useRouter } from "next/router"
// types
import { ISet } from "src/types/curr-active-sesh"
// components
import ParentCard from "../UI/ParentCard"
import Text, { Typography } from "../UI/typography/Text"
import PrimaryButton from "../UI/PrimaryButton"

interface SummaryProps {
  completedSets: ISet[]
}

export default function Summary({ completedSets }: SummaryProps) {
  const router = useRouter()

  const completedSetsExerciseHash = (() => {
    const hash: Map<string, ISet[]> = new Map()
    for (const set of completedSets) {
      if (!hash.has(set.exerciseId)) {
        hash.set(set.exerciseId, [set])
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        hash.set(set.exerciseId, [...hash.get(set.exerciseId)!, set])
      }
    }
    return hash
  })()

  const displayExercises = (() => {
    const displayExercisesArr: React.ReactNode[] = []

    completedSetsExerciseHash.forEach((completedExercisesArr, exerciseId) => {
      const exercises: React.ReactNode[] = []
      for (const exercise of completedExercisesArr) {
        exercises.push(
          <div className="grid grid-cols-12">
            <div className="col-span-3 text-center font-bold">
              {exercise.setNumber}
            </div>
            <div className="col-span-3 text-center">{exercise.weight}</div>
            <div className="col-span-3 text-center">{exercise.unit}</div>
            <div className="col-span-3 text-center">{exercise.reps}</div>
          </div>
        )
      }
      return displayExercisesArr.push(
        <ParentCard
          cardTitle={completedExercisesArr[0].exerciseName}
          key={exerciseId}
        >
          <div className="grid grid-cols-12">
            <div className="col-span-3 text-center font-bold">Set</div>
            <div className="col-span-3 text-center font-bold">Weight</div>
            <div className="col-span-3 text-center font-bold">Unit</div>
            <div className="col-span-3 text-center font-bold">Reps</div>
          </div>
          {exercises}
        </ParentCard>
      )
    })
    return displayExercisesArr
  })()

  return (
    <div className="flex flex-col gap-2">
      <Text
        text="Workout Summary"
        typography={Typography.h3}
        className="text-h3"
      />
      <div className="flex flex-col gap-2">{displayExercises}</div>
      <PrimaryButton
        label="Done"
        type="button"
        onClick={() => router.push("/workouts")}
      />
    </div>
  )
}
