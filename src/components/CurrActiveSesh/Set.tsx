import React, { useState } from "react"
// types
import { ISet } from "src/types/curr-active-sesh"
// utils
import generateUuid from "src/utils/uuid"
// hooks
import useCurrActiveSeshIndexDb, {
  IndexedDBStore,
} from "src/hooks/useCurrActiveSeshIndexDb"
// components
import Input from "../UI/Input"

interface SetProps {
  frontendSetId?: string
  weight: string
  reps: number
  setNumber: number
  exerciseId: string
  sessionId: string
  unit: string
  isDone?: boolean
  exerciseName: string | undefined
}

export default function Set({
  frontendSetId,
  weight,
  reps,
  setNumber,
  exerciseId,
  sessionId,
  unit,
  isDone,
  exerciseName,
}: SetProps) {
  const { addToDb } = useCurrActiveSeshIndexDb()

  const [setValues, setSetValues] = useState<ISet>({
    frontendSetId: frontendSetId ?? generateUuid(),
    isDone: isDone ?? false,
    weight,
    unit,
    reps,
    sessionId,
    exerciseId,
    setNumber,
    exerciseName: exerciseName ?? "",
  })

  return (
    <form className="grid grid-cols-12 col-span-12">
      <div className="col-span-3 text-center font-bold">{setNumber}</div>
      <div className="col-span-3 items-center justify-center w-full h-full">
        <Input
          inputClassName="basis-full text-center"
          value={setValues.weight}
          onChange={(e) => {
            const newValues = { ...setValues, weight: e.target.value }
            setSetValues(newValues)
            addToDb(IndexedDBStore.CurrActiveSesh, newValues)
          }}
        />
      </div>
      <div className="col-span-3 text-center font-bold">{unit}</div>
      <div className="col-span-3 text-center">
        <input
          type="checkbox"
          checked={setValues.isDone}
          onChange={(e) => {
            const isChecked = e.target.checked
            if (isChecked) {
              setValues.isDone = true
              addToDb(IndexedDBStore.CurrActiveSesh, setValues)
              setSetValues({ ...setValues, isDone: true })
            } else {
              setValues.isDone = false
              addToDb(IndexedDBStore.CurrActiveSesh, setValues)
              setSetValues({ ...setValues, isDone: false })
            }
          }}
        />
      </div>
    </form>
  )
}
