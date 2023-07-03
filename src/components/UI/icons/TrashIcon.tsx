import React from "react"
import IconBase from "./IconBase"

interface TrashIconProps {
  onClick?: () => void
}

export default function TrashIcon({ onClick }: TrashIconProps) {
  return (
    <IconBase
      onClick={onClick}
      src="https://img.icons8.com/?size=512&id=68064&format=png"
      alt="trash-icon"
    />
  )
}
