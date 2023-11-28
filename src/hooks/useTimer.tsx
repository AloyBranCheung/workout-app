import { useState, useEffect } from "react"
import dayjs from "dayjs"

export default function useTimer(
  countdownTime = 90000,
  formatCountdown = "mm:ss",
  decrement = 1000
) {
  const [isStart, setIsStart] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [countdown, setCountdown] = useState(countdownTime) // milliseconds, default 1min. 30 sec.

  const addTime = (time: number) => setCountdown(countdown + time)

  const subtractTime = (time: number) => setCountdown(countdown - time)

  const startTimer = () => setIsStart(true)

  const stopTimer = () => setIsStart(false)

  const milliToMinSec = (milliseconds: number) =>
    dayjs(milliseconds).format(formatCountdown)

  const resetTimer = () => {
    setCountdown(countdownTime)
    setIsDone(false)
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isStart) {
      interval = setInterval(() => {
        if (countdown <= 0) {
          setIsStart(false)
          setIsDone(true)
        } else {
          setCountdown(countdown - decrement)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [countdown, countdownTime, decrement, isStart])

  return {
    countdown: milliToMinSec(countdown),
    addTime,
    subtractTime,
    startTimer,
    stopTimer,
    isDone,
    resetTimer,
  }
}
