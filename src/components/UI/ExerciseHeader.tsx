import React from "react"

export default function ExerciseHeader() {
  return (
    <div className="col-span-12 grid grid-cols-12">
      <div className="col-span-3">
        <b>Set</b>
      </div>
      <div className="col-span-3">
        <b>Weight</b>
      </div>
      <div className="col-span-3">
        <b>Unit</b>
      </div>
      <div className="col-span-3">
        <b>Reps</b>
      </div>
    </div>
  )
}
