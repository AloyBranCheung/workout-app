import React from "react"
import Card from "./Card"
import Text, { Typography } from "./typography/Text"

interface ParentCardProps {
  cardTitle?: string
  children: React.ReactNode
}

export default function ParentCard({ cardTitle, children }: ParentCardProps) {
  return (
    <Card className="flex flex-col gap-5 py-6 px-3">
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
