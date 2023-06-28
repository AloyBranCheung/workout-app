import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface HamburgerIconProps {
  onClick?: () => void
}

export default function HamburgerIcon({ onClick }: HamburgerIconProps) {
  return (
    <motion.button
      className="cursor-pointer rounded-full"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      <Image
        width="30"
        height="30"
        src="https://img.icons8.com/ios-glyphs/30/hamburger.png"
        alt="navbar-menu-icon"
      />
    </motion.button>
  )
}
