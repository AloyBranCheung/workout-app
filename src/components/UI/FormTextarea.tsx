import React from "react"
import { Controller, FieldValues, UseControllerProps } from "react-hook-form"
import { startCase } from "lodash"
import FormErrorMsg from "./FormErrorMsg"

interface FormTextAreaProps<FV extends FieldValues> {
  name: UseControllerProps<FV>["name"]
  control: UseControllerProps<FV>["control"]
  label?: string
}

export default function FormTextarea<FV extends FieldValues>({
  name,
  control,
  label,
}: FormTextAreaProps<FV>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          <label htmlFor={name}>
            <strong>{label || startCase(name)}</strong>
          </label>
          <textarea
            rows={3}
            onChange={onChange}
            value={value}
            className="border-2 border-solid border-black rounded-2xl p-2"
          />
          <FormErrorMsg text={error?.message || ""} />
        </div>
      )}
    />
  )
}
