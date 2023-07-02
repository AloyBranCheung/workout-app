import React from "react"
import IconBase from "./IconBase"

interface EditIconProps {
  onClick: () => void
}

export default function EditIcon({ onClick }: EditIconProps) {
  return (
    <IconBase
      onClick={onClick}
      src="https://img.icons8.com/?size=512&id=71201&format=png"
      alt="edit-icon"
    />
  )
}
