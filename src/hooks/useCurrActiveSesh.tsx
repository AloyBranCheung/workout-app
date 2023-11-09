import { useEffect, useState } from "react"
import { useRouter } from "next/router"
// jotai
import { useAtom } from "jotai"
import { currActiveSeshIdAtom } from "src/stores/curr-active-sesh-store"
// hooks
import useGetCurrActiveSesh from "./useGetCurrActiveSesh"

export default function useCurrActiveSesh() {
  const router = useRouter()
  const [currWorkoutPlanId, setCurrWorkoutPlanId] = useState("")
  const { data: currActiveSeshRes, isLoading: isLoadingCurrActiveSesh } =
    useGetCurrActiveSesh(currWorkoutPlanId)
  const [isCurrActiveSeshPresent, setIsCurrActiveSeshPresent] = useState(false)
  const [currActiveSeshId, setCurrActiveSeshId] = useAtom(currActiveSeshIdAtom)
  const [isNotifyActiveWorkout, setIsNotifyActiveWorkout] = useState(false)

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
