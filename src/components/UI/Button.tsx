import React from "react"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"

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
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={twMerge(
        "border-solid border-black border-2 rounded-lg px-2 ",
        className
      )}
      onClick={onClick}
      type={type}
    >
      <strong>{label}</strong>
    </motion.button>
  )
}

Button.defaultProps = {
  onClick: undefined,
}
