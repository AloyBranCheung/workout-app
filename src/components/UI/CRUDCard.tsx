import React from "react"
// components
import SecondaryCard from "./SecondaryCard"
import EditIcon from "./icons/EditIcon"
import TrashIcon from "./icons/TrashIcon"

interface CrudCardProps {
  onClickEdit: () => void
  onClickDelete: () => void
  children: React.ReactNode
}

export default function CRUDCard({
  children,
  onClickEdit,
  onClickDelete,
}: CrudCardProps) {
  return (
    <SecondaryCard className="flex justify-between items-center">
      <div className="w-full">{children}</div>
      <div className="flex flex-col gap-2">
        <EditIcon onClick={onClickEdit} />
        <TrashIcon onClick={onClickDelete} />
      </div>
    </SecondaryCard>
  )
}
