import React from "react"
import Card from "./Card"
import { twMerge } from "tailwind-merge"

interface SecondaryCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function SecondaryCard({
  children,
  className,
  onClick,
}: SecondaryCardProps) {
  return (
    <Card
      onClick={onClick}
      className={twMerge("bg-secondary-button", className)}
    >
      {children}
    </Card>
  )
}
