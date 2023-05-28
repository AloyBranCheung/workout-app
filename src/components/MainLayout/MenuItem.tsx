import React from "react"

interface MenuItemProps {
  children: React.ReactNode
  onClick?: () => void
}

export default function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="font-bold flex items-center justify-center bg-tertiary border-solid border-2 border-black shadow-neobrutShadow p-2"
    >
      {children}
    </div>
  )
}

MenuItem.defaultProps = {
  onClick: undefined,
}
