import { useState, useEffect } from "react"
import dayjs from "dayjs"
// hooks
import useMutationUpdateUserProfile from "./useMutationUpdateUserProfile"

interface TimeObject {
  sec: string
  min: string
}

const toMilliseconds = (min: number, sec: number) => (min * 60 + sec) * 1000

export default function useTimer(
  countdownTime = 90000,
  formatCountdown = "mm:ss",
  decrement = 1000,
  onDone?: () => void
) {
  const { mutate } = useMutationUpdateUserProfile()

  const [isStart, setIsStart] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [countdown, setCountdown] = useState(countdownTime) // milliseconds, default 1min. 30 sec.

  const addTime = (time: number) => {
    setCountdown(countdown + time)
  }

  const subtractTime = (time: number) => {
    if (countdown - time <= 0) return
    setCountdown(countdown - time)
  }

  const startTimer = (timeObj?: TimeObject) => {
    if (timeObj) {
      const milli = toMilliseconds(Number(timeObj.min), Number(timeObj.sec))
      mutate({ restTimer: milli })
      setCountdown(milli)
      setIsStart(true)
    } else {
      setCountdown(countdownTime)
      setIsStart(true)
    }
  }

  const togglePause = () => setIsPaused(!isPaused)

  const milliToMinSec = (milliseconds: number) =>
    dayjs(milliseconds).format(formatCountdown)

  const resetTimer = () => {
    setCountdown(countdownTime)
    setIsDone(false)
  }

  const stopTimer = () => {
    setIsDone(false)
    setIsStart(false)
    setIsPaused(false)
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isStart && !isPaused) {
      interval = setInterval(() => {
        if (countdown <= 0) {
          setIsStart(false)
          setIsDone(true)
          onDone && onDone()
        } else {
          setCountdown(countdown - decrement)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [countdown, countdownTime, decrement, isPaused, isStart, onDone])

  return {
    countdown: milliToMinSec(countdown),
    addTime,
    subtractTime,
    startTimer,
    isDone,
    resetTimer,
    isStart,
    togglePause,
    isPaused,
    stopTimer,
    milliToMinSec,
  }
}
