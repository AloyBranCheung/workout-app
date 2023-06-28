import React from "react"
import styles from "./loading-spinner.module.css"
import { twMerge } from "tailwind-merge"

interface LoadingSpinnerProps {
  className?: string
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center w-full h-full",
        className
      )}
    >
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
