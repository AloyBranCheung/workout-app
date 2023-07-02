import React from "react"
import { twMerge } from "tailwind-merge"

interface CardProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
  className?: string
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "border-solid border-black border-2 p-2 rounded-lg shadow-neobrutShadow w-full h-full bg-tertiary",
        className
      )}
    >
      {children}
    </div>
  )
}
