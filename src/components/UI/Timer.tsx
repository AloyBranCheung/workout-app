import React from "react"
// hooks
import useTimer from "src/hooks/useTimer"

export default function Timer() {
  const { countdown, startTimer, isDone, resetTimer } = useTimer(3000)

  return (
    <div>
      {countdown}{" "}
      {isDone ? (
        <button onClick={() => resetTimer()}>reset</button>
      ) : (
        <button onClick={() => startTimer()}>start</button>
      )}
    </div>
  )
}
