import React from "react"
import { twMerge } from "tailwind-merge"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        "border-solid border-black border-2 p-2 rounded-lg shadow-neobrutShadow w-full h-full bg-tertiary",
        className
      )}
    >
      {children}
    </div>
  )
}
