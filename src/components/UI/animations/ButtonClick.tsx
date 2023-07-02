import { motion } from "framer-motion"
import React from "react"

interface ButtonClickProps {
  children: React.ReactNode
  withAnimation?: boolean
}

export default function ButtonClick({
  children,
  withAnimation,
}: ButtonClickProps) {
  return (
    <motion.div
      whileTap={withAnimation ? { scale: 0.95 } : undefined}
      whileHover={withAnimation ? { scale: 1.05 } : undefined}
    >
      {children}
    </motion.div>
  )
}

ButtonClick.defaultProps = {
  withAnimation: true,
}
