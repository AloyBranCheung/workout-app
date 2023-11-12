import React from "react"
// types/utils
import generateUuid from "src/utils/uuid"
import { ISet } from "./index"
// components
import Set from "./Set"

interface SetGridProps {
  sets: ISet[]
}

export default function SetGrid({ sets }: SetGridProps) {
  const setRows = sets.map(({ name, weight, reps, setNumber }) => (
    <Set
      key={generateUuid()}
      name={name}
      weight={weight}
      reps={reps || 0}
      setNumber={setNumber}
    />
  ))

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 text-center font-bold">Set</div>
      <div className="col-span-3 text-center font-bold">Weight</div>
      <div className="col-span-3 text-center font-bold">Reps</div>
      <div className="col-span-3 text-center font-bold">✅</div>
      {setRows}
    </div>
  )
}
