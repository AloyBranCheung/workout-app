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
    reps: reps ?? 0,
    sessionId,
    exerciseId,
    setNumber,
    exerciseName: exerciseName ?? "",
  })

  return (
    <form className="grid grid-cols-12 col-span-12 gap-2">
      <div className="col-span-3 text-center font-bold">{setNumber}</div>
      <div className="col-span-3 items-center justify-center w-full h-full border-solid border-black border-2 rounded-xl flex pr-2">
        <Input
          inputClassName="basis-10/12 text-center border-none outline-none focus:border-none focus:outline-none"
          value={setValues.weight}
          onChange={(e) => {
            const newValues = { ...setValues, weight: e.target.value }
            setSetValues(newValues)
            addToDb(IndexedDBStore.CurrActiveSesh, newValues)
          }}
        />
        <div>
          <b>{unit}</b>
        </div>
      </div>
      <div className="col-span-3 text-center font-bold">
        <Input
          inputClassName="basis-full text-center"
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          value={setValues.reps!}
          onChange={(e) => {
            const newValues = { ...setValues, reps: Number(e.target.value) }
            setSetValues(newValues)
            addToDb(IndexedDBStore.CurrActiveSesh, newValues)
          }}
        />
      </div>
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
