import React from "react"
import Button from "./Button"
import { twMerge } from "tailwind-merge"

interface PrimaryButtonProps {
  label: string
  onClick?: () => void
  type: "button" | "submit" | "reset"
  className?: string
}

export default function PrimaryButton({
  label,
  onClick,
  type,
  className,
}: PrimaryButtonProps) {
  return (
    <Button
      label={label}
      onClick={onClick}
      type={type}
      className={twMerge(
        "rounded-2xl border-solid border-2 border-black bg-primary-button hover:bg-hover-primary shadow-neobrutShadow text-white py-2.5 px-20 ",
        className
      )}
    />
  )
}
