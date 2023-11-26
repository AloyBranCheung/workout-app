import React, { useState, useEffect } from "react"
// hooks
import useCurrActiveSeshIndexDb, {
  IndexedDBStore,
} from "src/hooks/useCurrActiveSeshIndexDb"
// types/utils
import generateUuid from "src/utils/uuid"
import { ISet } from "../../types/curr-active-sesh"
import { Exercise } from "."
// components
import Set from "./Set"

interface SetGridProps {
  sets: ISet[]
  currActiveExercise: Exercise | undefined
}

export default function SetGrid({ sets, currActiveExercise }: SetGridProps) {
  const [currExerciseId, setCurrExerciseId] = useState(currActiveExercise)
  const [currSets, setCurrSets] = useState<ISet[]>([])
  const { getAllFromDb } = useCurrActiveSeshIndexDb()

  const setRows = (() => {
    const results = []
    for (let i = 0; i < sets.length; i++) {
      const setNumber = i + 1
      const currSet = currSets[i]
      if (!currSet) {
        results.push(sets[i])
      } else if (currSet.setNumber !== setNumber) {
        results.push(sets[i])
      } else {
        results.push(currSet)
      }
    }

    return results.map(
      ({
        exerciseId,
        weight,
        reps,
        setNumber,
        sessionId,
        unit,
        frontendSetId,
        isDone,
      }) => (
        <Set
          key={generateUuid()}
          weight={weight}
          reps={reps || 0}
          setNumber={setNumber}
          exerciseId={exerciseId}
          sessionId={sessionId}
          unit={unit}
          frontendSetId={frontendSetId}
          isDone={isDone}
          exerciseName={currActiveExercise?.name}
        />
      )
    )
  })()

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      const response = (await getAllFromDb(
        IndexedDBStore.CurrActiveSesh
      )) as ISet[]
      const filteredRes = response
        .filter((curr) => curr.exerciseId === currActiveExercise?.exerciseId)
        .sort((a, b) => {
          if (a.setNumber > b.setNumber) {
            return 1
          }
          if (a.setNumber < b.setNumber) {
            return -1
          }
          return 0
        })
      if (currActiveExercise !== currExerciseId) {
        setCurrExerciseId(currActiveExercise)
        setCurrSets(filteredRes)
        return
      }
      if (currSets.length < 1 && filteredRes.length > 0) {
        setCurrSets(filteredRes)
        return
      }
    })()
  }, [
    currActiveExercise,
    currActiveExercise?.exerciseId,
    currExerciseId,
    currSets,
    currSets.length,
    getAllFromDb,
    sets,
  ])

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-3 text-center font-bold">Set</div>
      <div className="col-span-3 text-center font-bold">Weight</div>
      <div className="col-span-3 text-center font-bold">Reps</div>
      <div className="col-span-3 text-center font-bold">✅</div>
      {setRows}
    </div>
  )
}
