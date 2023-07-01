import React from "react"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, SortingStrategy } from "@dnd-kit/sortable"

interface DragsortableProps {
  items: Array<number | string>
  children: React.ReactNode
  sortingStrategy: SortingStrategy
  onDragEnd?: (event: DragEndEvent) => void
}

export default function DragSortable({
  items,
  children,
  onDragEnd,
  sortingStrategy,
}: DragsortableProps) {
  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext strategy={sortingStrategy} items={items}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
