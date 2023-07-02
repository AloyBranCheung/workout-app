import React from "react"
import Card from "./Card"
import Text, { Typography } from "./typography/Text"
import { twMerge } from "tailwind-merge"

interface ParentCardProps {
  cardTitle?: string
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function ParentCard({
  cardTitle,
  children,
  className,
  onClick,
}: ParentCardProps) {
  return (
    <Card
      onClick={onClick}
      className={twMerge("flex flex-col gap-5 py-6 px-3", className)}
    >
      {cardTitle && (
        <Text
          typography={Typography.p1}
          text={cardTitle}
          bold
          className="text-p1"
        />
      )}
      {children}
    </Card>
  )
}
