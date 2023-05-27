import React from "react"
// components
import HamburgerIcon from "../UI/icons/HamburgerIcon"

export default function TopNavbar() {
  return (
    <div className="border-solid border-2 border-black shadow-neobrutShadow bg-tertiary flex items-center justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between px-5 py-3">
        <h4 className="text-shadow-textShadow text-white text-xl">
          simplyworkouts
        </h4>
        <HamburgerIcon />
      </div>
    </div>
  )
}
