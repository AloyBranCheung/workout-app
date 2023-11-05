import React from "react"
import { FieldValues, UseControllerProps, Controller } from "react-hook-form"
import { startCase } from "lodash"
// types
import { MenuOption } from "src/types/menu"

interface FormSelectProps<FV extends FieldValues> {
  name: UseControllerProps<FV>["name"]
  control: UseControllerProps<FV>["control"]
  label?: string
  menuOptions: MenuOption[] | []
}

export default function FormSelect<FV extends FieldValues>({
  name,
  control,
  label,
  menuOptions,
}: FormSelectProps<FV>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <div className="flex justify-between items-center w-full gap-2">
          <label htmlFor={name} className="w-full">
            <b>{label || startCase(name)}:</b>
          </label>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full"
          >
            <option value="">Select an option</option>
            {menuOptions.length > 0 ? (
              <>
                {menuOptions.map(({ id, name, value }) => (
                  <option key={id} value={value}>
                    {name}
                  </option>
                ))}
                <option value="addGymLocation">Add an option</option>
              </>
            ) : (
              <>
                <option value="">Select an option</option>
                <option value="addGymLocation">Add an option</option>
              </>
            )}
          </select>
          {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
      )}
    />
  )
}
