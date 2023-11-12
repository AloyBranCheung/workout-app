import React from "react"
// react-hook-form
import { useForm } from "react-hook-form"

interface SetProps {
  name: string
  weight: string
  reps: number
  setNumber: number
}

export default function Set({ name, weight, reps, setNumber }: SetProps) {
  const { handleSubmit } = useForm()

  return (
    <form className="grid grid-cols-12 col-span-12">
      <div className="col-span-3 text-center font-bold">{setNumber}</div>
      <div className="col-span-3 text-center"></div>
      <div className="col-span-3 text-center">Reps</div>
      <div className="col-span-3 text-center">✅</div>
    </form>
  )
}

// * Step1: Submit form to create a Set row in table, returns the setId and save
// * the id
// * to state of this component so that if checkmark box toggle then will take
// * the
// * id to delete it. Step2: On first load will feed all the sets in if it
// * exists and set it to the id state
