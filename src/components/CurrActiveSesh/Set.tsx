import React from "react"
// react-hook-form
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// types
import { AddSetSchema } from "src/validators/add-set-schema"
import WeightEnum from "src/types/weight-enum"
// components
import FormSelect from "../UI/FormSelect"
import FormInput from "../UI/FormInput"
import { z } from "zod"

interface SetProps {
  name: string
  weight: string
  reps: number
  setNumber: number
  exerciseId: string
  sessionId: string
  unit: string
}

export default function Set({
  name,
  weight,
  reps,
  setNumber,
  exerciseId,
  sessionId,
  unit,
}: SetProps) {
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddSetSchema),
    defaultValues: {
      weight: 0,
      unit: unit,
      reps: 0,
      note: "",
      sessionId,
      exerciseId,
    },
  })

  const onSubmitForm = (data: z.infer<typeof AddSetSchema>) => {
    console.log("submit")
    console.log({ data })
  }

  console.log(errors)

  return (
    <form className="grid grid-cols-12 col-span-12">
      <div className="col-span-3 text-center font-bold">{setNumber}</div>
      <FormInput
        name="weight"
        control={control}
        containerClassname="col-span-3 items-center justify-center w-full h-full"
        inputClassName="basis-full text-center"
        withLabel={false}
      />
      <div className="col-span-3 text-center font-bold">{unit}</div>
      <div className="col-span-3 text-center">
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              // TODO: get set id to delete if uncheck
              console.log("submit form")
              handleSubmit(onSubmitForm)
            } else {
              console.log("delete record")
            }
          }}
        />
      </div>
    </form>
  )
}

// * Step1: Submit form to create a Set row in table, returns the setId and save
// * the id
// * to state of this component so that if checkmark box toggle then will take
// * the
// * id to delete it. Step2: On first load will feed all the sets in if it
// * exists and set it to the id state
