import React from "react"
import Image from "next/image"

interface HamburgerIconProps {
  onClick?: () => void
}

export default function HamburgerIcon({ onClick }: HamburgerIconProps) {
  return (
    <button className="cursor-pointer rounded-full" onClick={onClick}>
      <Image
        width="30"
        height="30"
        src="https://img.icons8.com/ios-glyphs/30/hamburger.png"
        alt="navbar-menu-icon"
      />
    </button>
  )
}
