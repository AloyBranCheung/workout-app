import React from "react"
import IconBase from "./IconBase"

interface DownIconProps {
  onClick?: () => void
}

export default function DownIcon({ onClick }: DownIconProps) {
  return (
    <IconBase
      onClick={onClick}
      src="https://img.icons8.com/?size=512&id=iLzpipP3emZc&format=png"
      alt="down-arrow"
    />
  )
}

DownIcon.defaultProps = {
  onClick: undefined,
}
