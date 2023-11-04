import Image from "next/image"
import React, { useState } from "react"

// https://cdn-icons-png.flaticon.com/512/126/126498.png

interface CopyIconProps {
  value: string
  label: string
}

export default function CopyIcon({ value, label }: CopyIconProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(value)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <div className="flex items-center gap-2 relative">
      <p>{label}</p>
      <Image
        onClick={handleClick}
        className="cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/512/126/126498.png"
        alt="flaticon-copy-icon.png"
        height={15}
        width={15}
      />
      {isCopied && (
        <p className="absolute top-[-1.75rem] right-[0.75rem] bg-white border-2 border-black border-solid rounded-xl px-1">
          Copied!
        </p>
      )}
    </div>
  )
}
