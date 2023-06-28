import React from "react"
import { twMerge } from "tailwind-merge"
import pxToRem from "src/utils/pxToRem"

interface Text1Props {
  text: string
  className?: string
  bold?: boolean
}

export default function Text1({ text, className, bold }: Text1Props) {
  return (
    <p className={twMerge(`text-[${pxToRem(22)}]`, className)}>
      {bold ? <strong>{text}</strong> : text}
    </p>
  )
}
