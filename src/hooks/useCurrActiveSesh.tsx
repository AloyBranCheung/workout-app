import { useEffect, useState } from "react"
import { useRouter } from "next/router"
// jotai
import { useAtom } from "jotai"
import {
  currActiveSeshIdAtom,
  currActiveWorkoutPlanIdAtom,
} from "src/stores/curr-active-sesh-store"
// hooks
import useGetCurrActiveSesh from "./useGetCurrActiveSesh"

export default function useCurrActiveSesh() {
  const router = useRouter()

  const [currWorkoutPlanId, setCurrWorkoutPlanId] = useAtom(
    currActiveWorkoutPlanIdAtom
  )
  const [currActiveSeshId, setCurrActiveSeshId] = useAtom(currActiveSeshIdAtom)

  const [isCurrActiveSeshPresent, setIsCurrActiveSeshPresent] = useState(false)
  const [isNotifyActiveWorkout, setIsNotifyActiveWorkout] = useState(false)

  const { data: currActiveSeshRes, isLoading: isLoadingCurrActiveSesh } =
    useGetCurrActiveSesh(currWorkoutPlanId)

  useEffect(() => {
    if (currActiveSeshRes) {
      setIsCurrActiveSeshPresent(true)
      setCurrActiveSeshId(currActiveSeshRes.actSeshId)
      if (router.asPath !== "/workouts/curr-active-workout") {
        setIsNotifyActiveWorkout(true)
      } else {
        setIsNotifyActiveWorkout(false)
      }
    }
  }, [currActiveSeshRes, router.asPath, setCurrActiveSeshId])

  return {
    isCurrActiveSeshPresent,
    currActiveSeshId,
    isLoadingCurrActiveSesh,
    setCurrWorkoutPlanId,
    currWorkoutPlanId,
    isNotifyActiveWorkout,
  }
}
