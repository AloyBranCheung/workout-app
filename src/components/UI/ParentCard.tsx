import React from "react"
import Card from "./Card"
import Text1 from "./typography/Text1"

interface ParentCardProps {
  cardTitle: string
  children: React.ReactNode
}

export default function ParentCard({ cardTitle, children }: ParentCardProps) {
  return (
    <Card className="flex flex-col gap-5 py-6 px-3">
      <Text1 text={cardTitle} bold />
      {children}
    </Card>
  )
}
