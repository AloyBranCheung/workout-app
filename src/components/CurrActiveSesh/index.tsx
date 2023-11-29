import React, { useState, useMemo } from "react"
import { useRouter } from "next/router"
import Pino from "pino"
import { z } from "zod"
// types
import { ISet } from "src/types/curr-active-sesh"
// utils
import { trpc } from "src/utils/trpc"
// validators
import { CompletedSetsSchema } from "src/validators/curr-active-exercises-schema"
// hooks
import useCurrActiveSesh from "src/hooks/useCurrActiveSesh"
import useGetSessionById from "src/hooks/useGetSessionById"
import useMutationCompletedWorkout from "src/hooks/useMutationCompletedWorkout"
import useCurrActiveSeshIndexDb, {
  IndexedDBStore,
} from "src/hooks/useCurrActiveSeshIndexDb"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import useGetSetsByExerciseId from "src/hooks/useGetSetsByExerciseId"
// lodash
import { capitalize } from "lodash"
// components
import LoadingSpinner from "../UI/LoadingSpinner"
import Carousel from "../UI/Carousel"
import SecondaryCard from "../UI/SecondaryCard"
import Text, { Typography } from "../UI/typography/Text"
import ParentCard from "../UI/ParentCard"
import SetGrid from "./SetGrid"
import BottomButton from "../UI/BottomButton"
import Modal from "../UI/Modal"
import Confirmation from "../UI/Confirmation"
import Timer from "../UI/Timer"

const logger = Pino()

export interface Exercise {
  userId: string
  createdAt: string
  updatedAt: string
  name: string
  url: string | null
  description: string | null
  gymId: string
  unit: string
  exerciseId: string
  targetReps: number | null
  targetSets: number | null
}

export default function CurrActiveSeshContainer() {
  const utils = trpc.useContext()
  const { getAllFromDb, clearDb } = useCurrActiveSeshIndexDb()
  const {
    currActiveSeshId,
    isLoading: isCurrActiveSeshLoading,
    setCurrWorkoutPlanId,
    setCurrActiveSeshId,
  } = useCurrActiveSesh()
  const { data: sessionRes, isLoading: isSessionLoading } =
    useGetSessionById(currActiveSeshId)
  const router = useRouter()
  const toastMsg = useToastMessage()
  const { mutate, isLoading: isMutating } = useMutationCompletedWorkout()

  const isLoading = isCurrActiveSeshLoading || isSessionLoading || isMutating

  const [currActiveExercise, setCurrActiveExercise] = useState<Exercise>()
  const [isCompleteWorkout, setIsCompleteWorkout] = useState(false)
  const [isCompleteIncompleteWorkout, setIsCompleteIncompleteWorkout] =
    useState(false)
  const { data: exerciseSetList } = useGetSetsByExerciseId(
    currActiveExercise?.exerciseId ?? ""
  )

  const exerciseHashmap = useMemo(() => {
    const exercisesArr = sessionRes?.workoutPlan?.exercises
    if (!exercisesArr) return {}

    const hash: { [key: string]: Exercise } = {}
    for (const exercise of exercisesArr) {
      if (!(exercise.exerciseId in hash)) {
        hash[exercise.exerciseId] = exercise
      }
    }
    return hash
  }, [sessionRes?.workoutPlan?.exercises])

  const exercisesList = useMemo(() => {
    const exerciseOrderArr = sessionRes?.workoutPlan?.exerciseOrder
    if (!exerciseOrderArr) return []
    const exerciseOrderObjArr = []
    for (const exerciseId of exerciseOrderArr) {
      exerciseOrderObjArr.push(exerciseHashmap[exerciseId])
    }
    return exerciseOrderObjArr
  }, [exerciseHashmap, sessionRes?.workoutPlan?.exerciseOrder])

  const carouselItems = useMemo(() => {
    const list = exercisesList.map((exercise) => ({
      id: exercise.exerciseId,
      value: (
        <SecondaryCard className="px-10 py-10 text-center">
          <b>{exercise.name}</b>
        </SecondaryCard>
      ),
    }))

    const defaultFirstExercise = exerciseHashmap[list[0]?.id]
    if (defaultFirstExercise) {
      setCurrActiveExercise(exerciseHashmap[list[0].id])
    }
    return list
  }, [exerciseHashmap, exercisesList])

  const mostRecentWeight = exerciseSetList?.[0]?.weight?.toString() ?? "0"

  const sets = useMemo(() => {
    if (!currActiveExercise?.targetSets) return []
    const sets: ISet[] = []
    for (let i = 0; i < currActiveExercise.targetSets; i++) {
      sets.push({
        setNumber: i + 1,
        exerciseName: currActiveExercise.name,
        weight: mostRecentWeight ?? "0",
        reps: currActiveExercise.targetReps,
        unit: currActiveExercise.unit,
        exerciseId: currActiveExercise.exerciseId,
        sessionId: currActiveSeshId,
        isDone: false,
      })
    }
    return sets
  }, [currActiveExercise, currActiveSeshId, mostRecentWeight])

  const handleCompleteWorkout = async () => {
    // get saved things from db
    const completedSets = (await getAllFromDb(
      IndexedDBStore.CurrActiveSesh
    )) as ISet[]
    const exerciseOrderArr = sessionRes?.workoutPlan?.exerciseOrder
    if (!exerciseOrderArr) return
    const sortedCompletedSets = completedSets.sort(
      (a, b) =>
        exerciseOrderArr.indexOf(a.exerciseId) -
        exerciseOrderArr.indexOf(b.exerciseId)
    )

    // calculate total sets to be completed
    let targetTotalSets = 0
    for (const exercise of Object.keys(exerciseHashmap)) {
      const { targetSets } = exerciseHashmap[exercise]
      if (targetSets) {
        targetTotalSets += targetSets
      }
    }

    // if not all set fields are touched
    if (sortedCompletedSets.length !== targetTotalSets) {
      setIsCompleteIncompleteWorkout(true)
    }
    // modal for complete workout
    else {
      setIsCompleteWorkout(true)
    }
  }

  const handleClickConfirm = async () => {
    // get saved things from db
    const completedSets = (await getAllFromDb(
      IndexedDBStore.CurrActiveSesh
    )) as ISet[]
    const exerciseOrderArr = sessionRes?.workoutPlan?.exerciseOrder
    if (!exerciseOrderArr) return
    const sortedCompletedSets = completedSets.sort(
      (a, b) =>
        exerciseOrderArr.indexOf(a.exerciseId) -
        exerciseOrderArr.indexOf(b.exerciseId)
    )

    // validate
    try {
      const validated = CompletedSetsSchema.parse(sortedCompletedSets)
      // mutate
      mutate(validated, {
        onSuccess: () => {
          toastMsg("Congratulations, workout completed!", ToastMessage.Success)
        },
        onError: () => {
          toastMsg("Error completed workout.", ToastMessage.Error)
        },
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const err of error.issues) {
          toastMsg(err.message, ToastMessage.Error)
        }
      } else {
        toastMsg("Error validating or updating.", ToastMessage.Error)
      }
      logger.error(error)
      return
    }
    // reset
    setCurrWorkoutPlanId("")
    setCurrActiveSeshId("")
    setIsCompleteIncompleteWorkout(false)
    setIsCompleteWorkout(false)
    clearDb(IndexedDBStore.CurrActiveSesh)
    utils.currActiveSesh.invalidate()

    // router navigate
    router.push({
      pathname: "/workouts/curr-active-workout/summary",
      query: {
        data: JSON.stringify(sortedCompletedSets),
      },
    })
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col gap-2">
      <div className="w-full">
        <Carousel
          items={carouselItems}
          onSlideChange={(swiper) => {
            if (!swiper) return
            const newCurrActiveExercise = carouselItems[swiper.activeIndex].id

            if (newCurrActiveExercise) {
              setCurrActiveExercise(exerciseHashmap[newCurrActiveExercise])
            }
          }}
        />
      </div>
      <Text
        text={
          currActiveExercise?.name ? capitalize(currActiveExercise.name) : ""
        }
        typography={Typography.h3}
        className="text-h3"
      />
      <ParentCard>
        <SetGrid sets={sets} currActiveExercise={currActiveExercise} />
      </ParentCard>
      <ParentCard>
        <Timer />
      </ParentCard>
      <BottomButton onClick={handleCompleteWorkout} label="Complete Workout?" />
      <Modal
        isOpen={isCompleteIncompleteWorkout}
        onClose={() => setIsCompleteIncompleteWorkout(false)}
        cardTitle="Complete Workout?"
      >
        <Confirmation
          onClickDecline={() => setIsCompleteIncompleteWorkout(false)}
          description="Not all your sets are complete. Are you sure you want to finish your workout?"
          onClickConfirm={handleClickConfirm}
          isLoading={isLoading}
        />
      </Modal>
      <Modal
        isOpen={isCompleteWorkout}
        onClose={() => setIsCompleteWorkout(false)}
        cardTitle="Complete Workout?"
      >
        <Confirmation
          onClickDecline={() => setIsCompleteWorkout(false)}
          description="Are you sure you want to finish your workout?"
          onClickConfirm={handleClickConfirm}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  )
}
