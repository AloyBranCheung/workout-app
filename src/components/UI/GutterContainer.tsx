import React from "react"

interface GutterContainerProps {
  children: React.ReactNode
}

export default function GutterContainer({ children }: GutterContainerProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-7xl">{children}</div>
    </div>
  )
}
