import React from "react"
import Card from "./Card"
import { twMerge } from "tailwind-merge"
import ButtonClick from "./animations/ButtonClick"

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
    <ButtonClick withAnimation={onClick ? true : false}>
      <Card
        onClick={onClick}
        className={twMerge("bg-secondary-button", className)}
      >
        {children}
      </Card>
    </ButtonClick>
  )
}
