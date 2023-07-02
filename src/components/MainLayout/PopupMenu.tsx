/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
// types/utils
import { OffsetPosition, Position } from "src/types/PopupMenuTypes"
import pxToRem from "src/utils/px-to-rem"

export interface PopupMenuProps {
  isOpen: boolean
  children: React.ReactNode
  anchorEl: React.MutableRefObject<HTMLDivElement | null>
  popupRef: React.MutableRefObject<HTMLDivElement | null>
  position: Position
  popupTopOffset?: number
  tailwindWidth?: string
}

export default function PopupMenu({
  isOpen,
  children,
  anchorEl,
  position,
  popupTopOffset,
  popupRef,
  tailwindWidth,
}: PopupMenuProps) {
  const [offsetPosition, setOffsetPosition] = useState<OffsetPosition>({
    [position]: {
      topOffset: 0,
      leftOffset: 0,
    },
  })

  useEffect(() => {
    if (!anchorEl.current || !popupRef.current) return
    const { bottom, right, x } = anchorEl.current.getBoundingClientRect()
    const ANCHOR_EL_WIDTH = right - x
    const ELEMENT_CENTER = popupRef.current.offsetWidth / 2

    setOffsetPosition({
      [Position.BottomLeft]: {
        topOffset: bottom + popupTopOffset!,
        leftOffset: 0,
      },
      [Position.BottomCenter]: {
        topOffset: bottom + popupTopOffset!,
        leftOffset: ANCHOR_EL_WIDTH / 2 - ELEMENT_CENTER,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl.current, popupRef.current, position, popupTopOffset])

  return (
    <div
      className={`absolute w-full ${tailwindWidth}`}
      style={{
        top: pxToRem(offsetPosition[position].topOffset),
        left: pxToRem(offsetPosition[position].leftOffset),
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

PopupMenu.defaultProps = {
  popupTopOffset: 0,
  tailwindWidth: undefined,
}
