import React, { useState, useMemo } from "react"
// hooks
import useCurrActiveSesh from "src/hooks/useCurrActiveSesh"
import useGetSessionById from "src/hooks/useGetSessionById"
// lodash
import { capitalize } from "lodash"
// components
import LoadingSpinner from "../UI/LoadingSpinner"
import Carousel from "../UI/Carousel"
import SecondaryCard from "../UI/SecondaryCard"
import Text, { Typography } from "../UI/typography/Text"
import ParentCard from "../UI/ParentCard"
import SetGrid from "./SetGrid"

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

export interface ISet {
  name: Exercise["name"]
  weight: Exercise["unit"]
  reps: Exercise["targetReps"]
  setNumber: number
  exerciseId: Exercise["exerciseId"]
  sessionId: string
  unit: Exercise["unit"]
}

export default function CurrActiveSeshContainer() {
  const { currActiveSeshId, isLoading: isCurrActiveSeshLoading } =
    useCurrActiveSesh()
  const { data: sessionRes, isLoading: isSessionLoading } =
    useGetSessionById(currActiveSeshId)

  const isLoading = isCurrActiveSeshLoading || isSessionLoading

  const [currActiveExercise, setCurrActiveExercise] = useState<Exercise>()

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

  const sets = useMemo(() => {
    if (!currActiveExercise?.targetSets) return []
    const sets: ISet[] = []
    for (let i = 0; i < currActiveExercise.targetSets; i++) {
      sets.push({
        setNumber: i + 1,
        name: currActiveExercise.name,
        weight: currActiveExercise.unit,
        reps: currActiveExercise.targetReps,
        unit: currActiveExercise.unit,
        exerciseId: currActiveExercise.exerciseId,
        sessionId: currActiveSeshId,
      })
    }
    return sets
  }, [currActiveExercise, currActiveSeshId])

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
        <SetGrid sets={sets} />
      </ParentCard>
    </div>
  )
}
