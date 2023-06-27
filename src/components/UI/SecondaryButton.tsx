import React from "react"
import { twMerge } from "tailwind-merge"
import PrimaryButton from "./PrimaryButton"

interface SecondaryButtonProps {
  label: string
  onClick?: () => void
  type: "button" | "submit" | "reset"
  className?: string
}

export default function SecondaryButton({
  label,
  onClick,
  type,
  className,
}: SecondaryButtonProps) {
  return (
    <PrimaryButton
      label={label}
      onClick={onClick}
      type={type}
      className={twMerge("bg-secondary-button text-black", className)}
    />
  )
}
