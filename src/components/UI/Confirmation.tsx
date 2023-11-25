import React from "react"
import YesNoBtnGroup from "./YesNoBtnGroup"

interface ConfirmationProps {
  description: string
  onClickConfirm: () => void
  onClickDecline: () => void
  isLoading?: boolean
}

export default function Confirmation({
  description,
  onClickDecline,
  onClickConfirm,
  isLoading,
}: ConfirmationProps) {
  return (
    <div className="flex flex-col gap-2">
      <p>{description}</p>
      <YesNoBtnGroup
        onClickConfirm={onClickConfirm}
        onClickDecline={onClickDecline}
        isLoading={isLoading}
      />
    </div>
  )
}

Confirmation.defaultProps = {
  isLoading: false,
}
