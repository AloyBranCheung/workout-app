import React from "react"
import YesNoBtnGroup from "./YesNoBtnGroup"

interface ConfirmationProps {
  description: string
  onClickConfirm: () => void
  onClickDecline: () => void
}

export default function Confirmation({
  description,
  onClickDecline,
  onClickConfirm,
}: ConfirmationProps) {
  return (
    <div className="flex flex-col gap-2">
      <p>{description}</p>
      <YesNoBtnGroup
        onClickConfirm={onClickConfirm}
        onClickDecline={onClickDecline}
      />
    </div>
  )
}
