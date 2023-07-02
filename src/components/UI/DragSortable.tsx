import React from "react"
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
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
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      <SortableContext strategy={sortingStrategy} items={items}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
