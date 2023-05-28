/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
// types/utils
import { OffsetPosition, Position } from "src/types/PopupMenuTypes"
import pxToRem from "src/utils/pxToRem"

export interface PopupMenuProps {
  isOpen: boolean
  children: React.ReactNode
  anchorEl: React.MutableRefObject<HTMLDivElement | null>
  position: Position
  popupTopOffset?: number
}

export default function PopupMenu({
  isOpen,
  children,
  anchorEl,
  position,
  popupTopOffset,
}: PopupMenuProps) {
  const offsetPosition: OffsetPosition = useMemo(() => {
    if (!anchorEl.current) {
      const defaultOffset = {
        topOffset: 0,
        leftOffset: 0,
      }

      return {
        [position]: defaultOffset,
      }
    }
    const { bottom, right, x } = anchorEl.current.getBoundingClientRect()
    const ANCHOR_EL_WIDTH = right - x

    return {
      [Position.BottomLeft]: {
        topOffset: bottom + popupTopOffset!,
        leftOffset: 0,
      },
      [Position.BottomCenter]: {
        topOffset: bottom + popupTopOffset!,
        leftOffset: ANCHOR_EL_WIDTH / 2 - ANCHOR_EL_WIDTH / 12,
      },
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl.current, position, popupTopOffset])

  return (
    <div
      className={`absolute`}
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
}
