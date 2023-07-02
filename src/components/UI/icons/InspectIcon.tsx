import React from "react"
import IconBase from "./IconBase"

interface InspectIconProps {
  onClick: () => void
}

export default function InspectIcon({ onClick }: InspectIconProps) {
  return (
    <IconBase
      onClick={onClick}
      src="https://img.icons8.com/?size=512&id=SfoGooXDPPeC&format=png"
      alt="inspect-icon"
    />
  )
}
