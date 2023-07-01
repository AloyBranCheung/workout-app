import React from "react"
import { twMerge } from "tailwind-merge"

const px = (px: number) => `text-[${px}px]`

export enum Typography {
  h3 = "h3",
  p1 = "p1",
  p2 = "p2",
  p3 = "p3",
}

interface TextProps {
  text: string
  typography: Typography
  className?: string
  bold?: boolean
  testId?: string
}

export default function Text({
  text,
  className,
  bold,
  typography,
  testId,
}: TextProps) {
  const fontSize = () => {
    switch (typography) {
      case Typography.h3:
        return px(36)
      case Typography.p1:
        return px(22)
      case Typography.p2:
        return px(16)
      case Typography.p3:
        return px(14)
      default:
        return px(16)
    }
  }

  return (
    <p className={twMerge(fontSize(), className)} data-testId={testId}>
      {bold ? <strong>{text}</strong> : text}
    </p>
  )
}
