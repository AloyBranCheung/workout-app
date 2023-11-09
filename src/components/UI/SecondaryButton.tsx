import React from "react"
import { twMerge } from "tailwind-merge"
import PrimaryButton from "./PrimaryButton"

interface SecondaryButtonProps {
  label: string
  onClick?: () => void
  type: "button" | "submit" | "reset"
  className?: string
  icon?: React.ReactNode
}

export default function SecondaryButton({
  label,
  onClick,
  type,
  className,
  icon,
}: SecondaryButtonProps) {
  return (
    <PrimaryButton
      label={label}
      onClick={onClick}
      type={type}
      icon={icon}
      className={twMerge(
        "bg-secondary-button text-black hover:bg-hover-secondary",
        className
      )}
    />
  )
}

SecondaryButton.defaultProps = {
  icon: undefined,
}
