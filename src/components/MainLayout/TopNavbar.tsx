import React from "react"
// components
import HamburgerIcon from "../UI/icons/HamburgerIcon"

export default function TopNavbar() {
  return (
    <div className="w-full bg-tertiary flex items-center justify-between px-5 py-3 border-solid border-2 border-black shadow-neobrutShadow">
      <h4 className="text-shadow-textShadow text-white text-xl">
        simplyworkouts
      </h4>
      <HamburgerIcon />
    </div>
  )
}
