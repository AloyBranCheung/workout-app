import { useState } from "react"
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"

export default function useDragSorting(startingItems: Array<number | string>) {
  const [items, setItems] = useState<Array<number | string>>(startingItems)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return { items, handleDragEnd, setItems, verticalListSortingStrategy }
}
