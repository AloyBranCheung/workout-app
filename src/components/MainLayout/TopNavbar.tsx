import React, { useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
// components
import HamburgerIcon from "../UI/icons/HamburgerIcon"
import PopupMenu from "./PopupMenu"
import MenuItem from "./MenuItem"
// types
import { Position } from "src/types/PopupMenuTypes"

interface TopNavbarProps {
  onClickLogout: () => void
  onClickBrand: () => void
  onClickPlan: () => void
  onToggleMenu: () => void
  isMenuOpen: boolean
}

export default function TopNavbar({
  onClickLogout,
  onClickBrand,
  onClickPlan,
  isMenuOpen,
  onToggleMenu,
}: TopNavbarProps) {
  const anchorEl = useRef<HTMLDivElement | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={anchorEl}
      className="sticky top-0 border-solid border-2 border-black shadow-neobrutShadow bg-background flex items-center justify-center w-full"
    >
      <div className="w-full max-w-7xl flex items-center justify-between px-5 py-3">
        <h4
          className="text-xl font-black cursor-pointer"
          onClick={onClickBrand}
        >
          simplyworkouts
        </h4>
        <HamburgerIcon onClick={onToggleMenu} />
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
              className="bg-background h-screen p-2 border-2 border-solid border-black shadow-neobrutShadow flex gap-3 flex-col z-20"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {
                  clipPath: "circle(9.6% at 100% 0)",
                  scale: 0,
                  transition: {
                    staggerChildren: 0.1,
                    staggerDirection: -1, // Reverse the staggering direction
                  },
                  transformOrigin: "top right",
                },
                show: {
                  scale: 1,
                  clipPath: "circle(141.5% at 100% 0)",
                  transition: {
                    duration: 0.3,
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <MenuItem
                className="bg-primary-button text-white"
                onClick={onClickPlan}
              >
                workouts
              </MenuItem>
              <MenuItem className="bg-primary-button text-white">
                exercises
              </MenuItem>
              <MenuItem onClick={onClickLogout}>logout</MenuItem>
            </motion.div>
          </AnimatePresence>
        </div>
      </PopupMenu>
    </div>
  )
}
