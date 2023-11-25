import { useEffect, useState } from "react"
import { useRouter } from "next/router"
// utils
import { trpc } from "src/utils/trpc"
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

  const utils = trpc.useContext()

  const isLoading = isLoadingCurrActiveSesh

  useEffect(() => {
    utils.currActiveSesh.getCurrActiveSesh.invalidate()

    if (currActiveSeshRes) {
      setIsCurrActiveSeshPresent(true)
      setCurrActiveSeshId(currActiveSeshRes.sessionId)
      if (
        router.asPath !== "/workouts/curr-active-workout" &&
        !router.asPath.startsWith("/workouts/curr-active-workout/summary")
      ) {
        setIsNotifyActiveWorkout(true)
      } else {
        setIsNotifyActiveWorkout(false)
      }
    } else {
      setIsNotifyActiveWorkout(false)
    }
  }, [
    currActiveSeshRes,
    router.asPath,
    setCurrActiveSeshId,
    utils.currActiveSesh.getCurrActiveSesh,
  ])

  return {
    isCurrActiveSeshPresent,
    currActiveSeshId,
    isLoading,
    setCurrWorkoutPlanId,
    currWorkoutPlanId,
    isNotifyActiveWorkout,
    setCurrActiveSeshId,
  }
}
