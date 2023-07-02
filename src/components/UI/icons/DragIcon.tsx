import React from "react"
import Image from "next/image"
import { twMerge } from "tailwind-merge"

interface DragIconProps {
  height: number
  width: number
  className?: string
}

export default function DragIcon({ height, width, className }: DragIconProps) {
  return (
    <Image
      className={twMerge("cursor-pointer", className)}
      height={height}
      width={width}
      src="https://img.icons8.com/?size=512&id=11089&format=png"
      alt="drag-icon"
    />
  )
}

DragIcon.defaultProps = {
  height: 30,
  width: 30,
}
