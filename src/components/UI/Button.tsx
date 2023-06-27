import React from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps {
  label: string
  onClick?: () => void
  type: "button" | "submit" | "reset"
  className?: string
}

export default function Button({
  label,
  onClick,
  type,
  className,
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "border-solid border-black border-2 rounded-lg px-2",
        className
      )}
      onClick={onClick}
      type={type}
    >
      <strong>{label}</strong>
    </button>
  )
}

Button.defaultProps = {
  onClick: undefined,
}
