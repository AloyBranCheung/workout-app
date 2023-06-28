import { AnimatePresence, motion } from "framer-motion"

import React from "react"

interface FadeProps {
  children: React.ReactNode
}
export default function Fade({ children }: FadeProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
