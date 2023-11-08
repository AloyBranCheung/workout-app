import React from "react"
// components
import PrimaryButton from "./PrimaryButton"
import Text, { Typography } from "./typography/Text"
import ParentCard from "./ParentCard"

interface CRUDProps {
  modals: React.ReactNode
  secondaryCards: React.ReactNode
  onCreate: () => void // toggle a create modal
  h3Text: string
  primaryButtonLabel: string
}

// CRUD layout styling
export default function CRUD({
  modals,
  onCreate,
  h3Text,
  secondaryCards,
  primaryButtonLabel,
}: CRUDProps) {
  return (
    <div className="flex flex-col justify-center w-full h-full gap-8">
      <PrimaryButton
        onClick={onCreate}
        label={primaryButtonLabel}
        type="button"
        className="w-full"
      />
      <div className="flex flex-col gap-5">
        <Text text={h3Text} typography={Typography.h3} className="text-h3" />
        <ParentCard cardTitle="">{secondaryCards}</ParentCard>
      </div>
      {modals}
    </div>
  )
}
