import React from "react"

interface ExerciseRowProps {
  setNumber: number
  weight: number
  weightType: string
  reps: number
}

export default function ExerciseRow({
  setNumber,
  weight,
  weightType,
  reps,
}: ExerciseRowProps) {
  return (
    <>
      <div className="col-span-3">{setNumber}</div>
      <div className="col-span-3">{weight}</div>
      <div className="col-span-3">{weightType}</div>
      <div className="col-span-3">{reps}</div>
    </>
  )
}
