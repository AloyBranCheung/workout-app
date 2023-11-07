import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface IconBaseProps {
  onClick?: () => void
  src: string
  alt: string
  height?: number
  width?: number
  children?: React.ReactNode
  withAnimation?: boolean
}

export default function IconBase({
  withAnimation,
  children,
  onClick,
  src,
  alt,
  height,
  width,
}: IconBaseProps) {
  const nextImage = (
    <Image
      onClick={!withAnimation ? onClick : undefined}
      width={width || 30}
      height={height || 30}
      src={src}
      alt={alt}
    />
  )

  return withAnimation ? (
    <motion.button
      className="cursor-pointer rounded-full"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      type="button"
    >
      {children || nextImage}
    </motion.button>
  ) : (
    nextImage
  )
}

IconBase.defaultProps = {
  withAnimation: true,
}
