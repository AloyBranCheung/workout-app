import React from "react"
import { UseControllerProps, Controller, FieldValues } from "react-hook-form"
import { startCase } from "lodash"
import { twMerge } from "tailwind-merge"

interface FormInputProps<FV extends FieldValues> {
  name: UseControllerProps<FV>["name"]
  control: UseControllerProps<FV>["control"]
  label?: string
  inputClassName?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"]
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"]
  required?: React.InputHTMLAttributes<HTMLInputElement>["required"]
}

export default function FormInput<FV extends FieldValues>({
  name,
  control,
  type,
  autoComplete,
  required,
  inputClassName,
  label,
}: FormInputProps<FV>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center w-full gap-2">
            <label htmlFor={name} className="w-full basis-1/4">
              <b>{label || startCase(name)}:</b>
            </label>
            <input
              className={twMerge(
                "border-solid border-black border-2 rounded-2xl w-full px-2 basis-3/4",
                inputClassName
              )}
              required={required}
              autoComplete={autoComplete}
              type={type}
              onChange={onChange}
              value={value}
              name={name}
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
      )}
    />
  )
}

FormInput.defaultProps = {
  type: "text",
  autoComplete: "off",
  required: true,
}
