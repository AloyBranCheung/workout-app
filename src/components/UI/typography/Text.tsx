import React from "react"
import { twMerge } from "tailwind-merge"

const px = (px: number) => `text-[${px}px]`

export enum Typography {
  h3 = "h3",
  p1 = "p1",
}

interface TextProps {
  text: string
  typography: Typography
  className?: string
  bold?: boolean
}

export default function Text({ text, className, bold, typography }: TextProps) {
  const fontSize = () => {
    switch (typography) {
      case Typography.h3:
        return px(36)
      case Typography.p1:
        return px(22)
      default:
        return px(16)
    }
  }

  return (
    <p className={twMerge(fontSize(), className)}>
      {bold ? <strong>{text}</strong> : text}
    </p>
  )
}
