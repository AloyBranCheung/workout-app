import React from "react"
// hooks
import useTimer from "src/hooks/useTimer"
// components
import Text, { Typography } from "./typography/Text"
import IconBase from "./icons/IconBase"
import PrimaryButton from "./PrimaryButton"

export default function Timer() {
  const {
    countdown,
    startTimer,
    isDone,
    resetTimer,
    addTime,
    subtractTime,
    stopTimer,
    isStart,
  } = useTimer()

  const buttonState = () => {
    if (isDone) {
      return (
        <PrimaryButton
          label="Reset"
          type="button"
          onClick={() => resetTimer()}
        />
      )
    }
    if (!isDone && isStart) {
      return (
        <PrimaryButton
          label="Pause"
          type="button"
          onClick={() => stopTimer()}
          className="w-full"
        />
      )
    }
    if (!isDone && !isStart) {
      return (
        <PrimaryButton
          label="Start"
          type="button"
          onClick={() => startTimer()}
          className="w-full"
        />
      )
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between pl-5 pr-5">
        <IconBase src={""} alt={""}>
          <button type="button" onClick={() => subtractTime(5000)}>
            <Text text="-5" typography={Typography.h3} className="text-h3" />
          </button>
        </IconBase>
        <Text text={countdown} typography={Typography.h3} className="text-h3" />
        <IconBase src={""} alt={""}>
          <button type="button" onClick={() => addTime(5000)}>
            <Text text="+5" typography={Typography.h3} className="text-h3" />
          </button>
        </IconBase>
      </div>
      {buttonState()}
    </div>
  )
}
