import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { twMerge } from "tailwind-merge"

interface MenuItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const menuItemVariants = {
  hidden: { y: 5, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export default function MenuItem({
  children,
  onClick,
  className,
}: MenuItemProps) {
  return (
    <AnimatePresence>
      <motion.div
        variants={menuItemVariants}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.01 }}
      >
        <div
          onClick={onClick}
          className={twMerge(
            "font-bold flex items-center justify-center bg-secondary-button border-solid border-2 border-black shadow-neobrutShadow p-2 cursor-pointer hover:bg-hover-secondary",
            className
          )}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

MenuItem.defaultProps = {
  onClick: undefined,
}
