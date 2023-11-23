import React from "react"
import { FieldValues, UseControllerProps, Controller } from "react-hook-form"
import { startCase } from "lodash"
// types
import { MenuOption } from "src/types/menu"
// utils
import { twMerge } from "tailwind-merge"

interface FormSelectProps<FV extends FieldValues> {
  name: UseControllerProps<FV>["name"]
  control: UseControllerProps<FV>["control"]
  label?: string
  menuOptions: MenuOption[] | []
  instruction?: string
  withAddAnOption?: boolean
  className?: string
  withLabel?: boolean
  withEmptyOption?: boolean
}

export default function FormSelect<FV extends FieldValues>({
  name,
  control,
  label,
  menuOptions,
  instruction,
  withAddAnOption,
  className,
  withLabel,
  withEmptyOption,
}: FormSelectProps<FV>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <div
          className={twMerge(
            "flex justify-between items-center w-full gap-2",
            className
          )}
        >
          {withLabel && (
            <label htmlFor={name} className="w-full">
              <b>{label || startCase(name)}:</b>
            </label>
          )}
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full"
          >
            {withEmptyOption && (
              <option value="">{instruction || "Select an option"}</option>
            )}
            {menuOptions.length > 0 ? (
              <>
                {menuOptions.map(({ id, name, value }) => (
                  <option key={id} value={value}>
                    {name}
                  </option>
                ))}
                {withAddAnOption && (
                  <option value="addGymLocation">Add an option</option>
                )}
              </>
            ) : (
              withAddAnOption && (
                <option value="addGymLocation">Add an option</option>
              )
            )}
          </select>
          {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
      )}
    />
  )
}

FormSelect.defaultProps = {
  withAddAnOption: true,
  className: undefined,
  withLabel: true,
  withEmptyOption: true,
}
