import React from "react"
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"

interface YesNoBtnGroupProps {
  confirmText?: string
  confirmBtnType?: "button" | "submit" | "reset"
  onClickConfirm?: () => void
  declineText?: string
  declineBtnType?: "button" | "submit" | "reset"
  onClickDecline?: () => void
  isLoading?: boolean
}

export default function YesNoBtnGroup({
  confirmText,
  confirmBtnType,
  onClickConfirm,
  declineText,
  declineBtnType,
  onClickDecline,
  isLoading,
}: YesNoBtnGroupProps) {
  return (
    <div className="flex gap-2 justify-end">
      <SecondaryButton
        className="p-2"
        label={declineText || "No"}
        type={declineBtnType || "button"}
        onClick={onClickDecline}
      />
      <PrimaryButton
        className="p-2"
        label={confirmText || "Yes"}
        type={confirmBtnType || "button"}
        onClick={onClickConfirm}
        isLoading={isLoading}
      />
    </div>
  )
}
