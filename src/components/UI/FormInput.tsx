import React from "react";
import { UseControllerProps, Controller, FieldValues } from "react-hook-form";
import { startCase } from "lodash";

interface FormInputProps<FV extends FieldValues> {
  name: UseControllerProps<FV>["name"];
  control: UseControllerProps<FV>["control"];
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  required?: React.InputHTMLAttributes<HTMLInputElement>["required"];
}

export default function FormInput<FV extends FieldValues>({
  name,
  control,
  type,
  autoComplete,
  required,
}: FormInputProps<FV>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center w-full gap-2">
            <label htmlFor={name}>
              <b>{startCase(name)}:</b>
            </label>
            <input
              required={required}
              autoComplete={autoComplete}
              type={type}
              onChange={onChange}
              value={value}
              name={name}
            />
          </div>
          <p className="text-red-500 text-xs">{error?.message}</p>
        </div>
      )}
    />
  );
}

FormInput.defaultProps = {
  type: "text",
  autoComplete: "off",
  required: true,
};
