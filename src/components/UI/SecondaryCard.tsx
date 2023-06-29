import React from "react"
import Card from "./Card"
import { twMerge } from "tailwind-merge"

interface SecondaryCardProps {
  children: React.ReactNode
  className?: string
}

export default function SecondaryCard({
  children,
  className,
}: SecondaryCardProps) {
  return (
    <Card className={twMerge("bg-secondary-button", className)}>
      {children}
    </Card>
  )
}
