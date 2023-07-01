// https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a
// https://react.dev/reference/react-dom/createPortal

import { ReactNode } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
// components
import ParentCard from "./ParentCard"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  cardTitle?: string
}

export default function Modal({
  children,
  isOpen,
  cardTitle,
  onClose,
}: ModalProps) {
  return isOpen
    ? createPortal(
        <AnimatePresence>
          <motion.div
            className="fixed left-0 right-0 top-0 bottom-0"
            onClick={onClose}
            initial={{ opacity: 0, clipPath: "circle(8.6% at 50% 50%)" }}
            animate={{
              opacity: 1,
              clipPath: "circle(70.7% at 50% 50%)",
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.3,
              },
            }}
          >
            <ParentCard className="bg-gray-900/50">
              <AnimatePresence>
                <motion.div
                  className="flex items-center justify-center w-full h-full"
                  initial={{
                    scale: 0.1,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  exit={{
                    scale: 0.1,
                  }}
                >
                  <ParentCard
                    cardTitle={cardTitle}
                    className="h-max max-h-screen overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {children}
                  </ParentCard>
                </motion.div>
              </AnimatePresence>
            </ParentCard>
          </motion.div>
        </AnimatePresence>,
        document.body
      )
    : null
}
