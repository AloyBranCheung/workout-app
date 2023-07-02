import React from "react"

interface BorderCardProps {
  children: React.ReactNode
}

export default function BorderCard({ children }: BorderCardProps) {
  return (
    <div className="flex flex-col gap-7 p-4 border-2 border-solid border-black rounded-2xl">
      {children}
    </div>
  )
}
