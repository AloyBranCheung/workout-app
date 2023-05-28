import React, { useState, useRef } from "react"
// components
import HamburgerIcon from "../UI/icons/HamburgerIcon"
import PopupMenu from "./PopupMenu"
// types
import { Position } from "src/types/PopupMenuTypes"

export default function TopNavbar() {
  const anchorEl = useRef<HTMLDivElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div
      ref={anchorEl}
      className="border-solid border-2 border-black shadow-neobrutShadow bg-tertiary flex items-center justify-center"
    >
      <div className="w-full max-w-7xl flex items-center justify-between px-5 py-3">
        <h4 className="text-shadow-textShadow text-white text-xl">
          simplyworkouts
        </h4>
        <HamburgerIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </div>
      <PopupMenu
        position={Position.BottomCenter}
        anchorEl={anchorEl}
        isOpen={isMenuOpen}
      >
        <div className="h-52 bg-white w-4/5">popup menu</div>
      </PopupMenu>
    </div>
  )
}
