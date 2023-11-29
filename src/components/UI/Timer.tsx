import React, { useState } from "react"
// hooks
import useTimer from "src/hooks/useTimer"
import useUserAttributes from "src/hooks/useUserAttributes"
// components
import Text, { Typography } from "./typography/Text"
import IconBase from "./icons/IconBase"
import PrimaryButton from "./PrimaryButton"
import AudioPlayer from "./AudioPlayer"

export default function Timer() {
  const { data: profilePrefrences, isLoading } = useUserAttributes()
  const [timerInput, setTimerInput] = useState({ sec: "30", min: "1" })
  const {
    countdown,
    startTimer,
    isDone,
    resetTimer,
    addTime,
    subtractTime,
    isPaused,
    isStart,
    togglePause,
  } = useTimer(profilePrefrences?.profile?.restTimer ?? 90000)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value
    const key = e.target.name
    setTimerInput({ ...timerInput, [key]: newNumber })
  }

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
    if (!isDone && isStart && !isPaused) {
      return (
        <PrimaryButton
          label="Pause"
          type="button"
          onClick={() => togglePause()}
          className="w-full"
        />
      )
    }
    if (!isDone && isStart && isPaused) {
      return (
        <PrimaryButton
          label="Resume"
          type="button"
          onClick={() => togglePause()}
          className="w-full"
        />
      )
    }
    if (!isDone && !isStart) {
      return (
        <PrimaryButton
          label="Start"
          type="button"
          onClick={() => startTimer(timerInput)}
          className="w-full"
        />
      )
    }
  }

  const timerDisplay = () => {
    if (!isDone && !isPaused && !isStart) {
      return (
        <div className="flex w-full items-center justify-center p-2 gap-2">
          <div className="flex items-center h-full">
            <input
              placeholder="1"
              maxLength={2}
              dir="rtl"
              name="min"
              value={timerInput.min}
              onChange={handleChange}
              className="w-10 border-b-2 border-solid border-black text-h3 outline-none text-slate-600"
            />
            <p className="border-b-2 border-solid border-black text-h3">m</p>
          </div>
          <div className="flex items-center h-full">
            <input
              placeholder="30"
              maxLength={2}
              dir="rtl"
              name="sec"
              value={timerInput.sec}
              onChange={handleChange}
              className="w-10 border-b-2 border-solid border-black text-h3 outline-none text-slate-600"
            />
            <p className="border-b-2 border-solid border-black text-h3">s</p>
          </div>
        </div>
      )
    }
    return (
      <Text text={countdown} typography={Typography.h3} className="text-h3" />
    )
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between pl-5 pr-5">
        <IconBase src={""} alt={""}>
          <div onClick={() => subtractTime(5000)}>
            <Text text="-5" typography={Typography.h3} className="text-h3" />
          </div>
        </IconBase>
        {timerDisplay()}
        <IconBase src={""} alt={""}>
          <div onClick={() => addTime(5000)}>
            <Text text="+5" typography={Typography.h3} className="text-h3" />
          </div>
        </IconBase>
      </div>
      {buttonState()}
      {isDone && !isStart && !isPaused && (
        <AudioPlayer isPlay src="/assets/sounds/goat-sound.wav" />
      )}
    </div>
  )
}
