import React, { HTMLInputTypeAttribute } from "react"
import { startCase } from "lodash"
import { twMerge } from "tailwind-merge"

interface InputProps {
  required?: boolean
  withLabel?: boolean
  label?: string
  inputClassName?: string
  autoComplete?: string
  type?: HTMLInputTypeAttribute
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string | number
  name?: string
}
export default function Input({
  required,
  withLabel,
  label,
  inputClassName,
  autoComplete,
  type,
  onChange,
  value,
  name,
}: InputProps) {
  return (
    <div className="flex justify-between items-center w-full gap-2">
      {withLabel && (
        <label htmlFor={name} className="w-full basis-1/4">
          <b>{label || startCase(name)}:</b>
        </label>
      )}
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
  )
}
