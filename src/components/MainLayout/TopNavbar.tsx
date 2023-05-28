import React, { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
// components
import HamburgerIcon from "../UI/icons/HamburgerIcon"
import PopupMenu from "./PopupMenu"
import MenuItem from "./MenuItem"
// types
import { Position } from "src/types/PopupMenuTypes"

export default function TopNavbar() {
  const anchorEl = useRef<HTMLDivElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div
      ref={anchorEl}
      className="border-solid border-2 border-black shadow-neobrutShadow bg-tertiary flex items-center justify-center w-full"
    >
      <div className="w-full max-w-7xl flex items-center justify-between px-5 py-3">
        <h4 className="text-xl font-black">simplyworkouts</h4>
        <HamburgerIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </div>
      <PopupMenu
        position={Position.BottomCenter}
        anchorEl={anchorEl}
        popupRef={popupRef}
        isOpen={isMenuOpen}
      >
        <div ref={popupRef}>
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {
                  transition: {
                    staggerChildren: 0.1,
                    staggerDirection: -1, // Reverse the staggering direction
                  },
                },
                show: {
                  transition: {
                    duration: 0.3,
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <MenuItem>Workout Plan</MenuItem>
              <MenuItem>Workout Routine</MenuItem>
              <MenuItem>Exercises</MenuItem>
              <MenuItem>Logout</MenuItem>
            </motion.div>
          </AnimatePresence>
        </div>
      </PopupMenu>
    </div>
  )
}
