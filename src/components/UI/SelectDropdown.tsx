import React from "react"
import { MenuOption } from "src/types/menu"

interface SelectDropdownProps {
  menuList: MenuOption[]
  value: string | number
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  instruction?: string
}

export default function SelectDropdown({
  menuList,
  onChange,
  value,
  instruction,
}: SelectDropdownProps) {
  return (
    <select
      className="border-solid border-black border-2 rounded-lg shadow-neobrutShadow py-2 px-1"
      value={value}
      onChange={onChange}
    >
      <option value="">{instruction || "Select an option"}</option>
      {menuList.map((option) => (
        <option key={`${option.id}-${option.name}`} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
