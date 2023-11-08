import React, { useEffect, useMemo, useState } from "react"
import { z } from "zod"
// react-hook-forms
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// hooks
import useDragSorting from "src/hooks/useDragSorting"
import useMutationUpdateWorkoutPlan from "src/hooks/useMutationUpdateWorkoutPlan"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import useGetExercises from "src/hooks/useGetExercises"
// types/utils
import { GetWorkoutPlansOutput } from "src/types/trpc/router-types"
import { UpdatePlanSchema } from "src/validators/workout-schema"
import exerciseHash from "src/utils/exercises-hashmap"
// components
import Text from "../UI/typography/Text"
import FormInput from "../UI/FormInput"
import BorderCard from "../UI/BorderCard"
import DragSortable from "../UI/DragSortable"
import ExerciseCard from "../CreateWorkout/ExerciseCard"
import YesNoBtnGroup from "../UI/YesNoBtnGroup"
import LoadingSpinner from "../UI/LoadingSpinner"
import SecondaryButton from "../UI/SecondaryButton"
import AddExercise from "./AddExercise"

interface IGymSpecificExercises {
  userId: string
  createdAt: string
  updatedAt: string
  name: string
  gymLocations: {
    name: string
    gymId: string
  }
  url: string | null
  description: string | null
  gymId: string
  unit: string
  exerciseId: string
}

interface EditWorkoutPlanProps {
  workoutPlan: GetWorkoutPlansOutput[number]
  onClose: () => void
}

export default function EditWorkoutPlan({
  workoutPlan,
  onClose,
}: EditWorkoutPlanProps) {
  const [isShowExercises, setIsShowExercises] = useState(false)
  const [exercises, setExercises] = useState<{
    [exerciseId: string]: { reps: string; sets: string }
  }>({})
  const [gymSpecificExercises, setGymSpecificExercises] = useState<
    IGymSpecificExercises[]
  >([])

  const { data: exercisesRes, isLoading: isLoadingGetExercises } =
    useGetExercises()

  const isGetting = isLoadingGetExercises

  const { exerciseHashmap, exerciseOrder } = useMemo(() => {
    const exerciseHashmap = exerciseHash(exercisesRes)
    const exerciseOrder = workoutPlan.exerciseOrder
    const exerciseObj: z.infer<typeof UpdatePlanSchema>["exercises"] = {}
    for (const exerciseId of Object.keys(exerciseHashmap)) {
      exerciseObj[exerciseId] = {
        reps: exerciseHashmap[exerciseId].targetReps?.toString() || "",
        sets: exerciseHashmap[exerciseId].targetSets?.toString() || "",
      }
    }

    setExercises(exerciseObj)

    return { exerciseOrder, exerciseHashmap }
  }, [exercisesRes, workoutPlan.exerciseOrder])

  const { items, verticalListSortingStrategy, handleDragEnd, setItems } =
    useDragSorting(exerciseOrder)

  const { control, handleSubmit, setValue } = useForm<
    z.infer<typeof UpdatePlanSchema>
  >({
    resolver: zodResolver(UpdatePlanSchema),
    defaultValues: {
      name: workoutPlan.name,
      planId: workoutPlan.planId,
      exerciseOrder: [],
      exercises,
      gymLocation: { ...workoutPlan.gymLocation },
    },
  })

  const toastMessage = useToastMessage()

  const { mutate, isLoading } = useMutationUpdateWorkoutPlan(
    () => {
      toastMessage("Successfully updated workout plan.", ToastMessage.Success)
      onClose()
    },
    () => {
      toastMessage("Failed to update workout plan.", ToastMessage.Error)
    }
  )

  const handleSubmitForm = (data: z.infer<typeof UpdatePlanSchema>) => {
    mutate(data)
  }

  const handleClickAddExercise = (exerciseId: string) => {
    setItems([...items, exerciseId])
    setGymSpecificExercises((prev) =>
      prev.filter((prevObj) => prevObj.exerciseId !== exerciseId)
    )
  }

  const handleClickRemoveExercise = (exerciseId: string) => {
    if (!(items.length > 1))
      return toastMessage("Cannot remove last item.", ToastMessage.Error)
    setItems(items.filter((itemId) => itemId !== exerciseId))
    if (exercisesRes) {
      const exerciseToAddBack = exercisesRes.find(
        (obj) => obj.exerciseId === exerciseId
      )

      if (exerciseToAddBack)
        setGymSpecificExercises((prevObj) =>
          [...prevObj, exerciseToAddBack].sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
          })
        )
    }
  }

  useEffect(() => {
    if (exercisesRes) {
      const arr = exercisesRes?.filter(
        (exercise) =>
          exercise.gymId === workoutPlan.gymId &&
          !workoutPlan.exerciseOrder.includes(exercise.exerciseId)
      )
      setGymSpecificExercises(arr)
    }
  }, [exercisesRes, workoutPlan.exerciseOrder, workoutPlan.gymId])

  useEffect(() => {
    setValue("exerciseOrder", items as string[])
  }, [items, setValue])

  useEffect(() => {
    setValue("exercises", exercises)
  }, [exercises, setValue])

  return isGetting ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col gap-4">
      <Text text={`Editing ${workoutPlan.name}`} className="text-p1" bold />
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <FormInput name="name" control={control} />
        {isShowExercises ? (
          <SecondaryButton
            label="Close"
            type="button"
            onClick={() => setIsShowExercises(false)}
          />
        ) : (
          <SecondaryButton
            label="Add Exercise"
            type="button"
            onClick={() => setIsShowExercises(true)}
          />
        )}
        {isShowExercises && (
          <AddExercise
            gymSpecificExercises={gymSpecificExercises}
            onClickAdd={handleClickAddExercise}
          />
        )}
        <BorderCard>
          <DragSortable
            items={items}
            sortingStrategy={verticalListSortingStrategy}
            onDragEnd={handleDragEnd}
          >
            {items.map((itemId) => (
              <ExerciseCard<z.infer<typeof UpdatePlanSchema>>
                exerciseId={itemId.toString()}
                key={itemId}
                control={control}
                exerciseName={exerciseHashmap[itemId]?.name || ""}
                setsName={`exercises.${itemId}.sets`}
                repsName={`exercises.${itemId}.reps`}
                onClickRemove={handleClickRemoveExercise}
              />
            ))}
          </DragSortable>
          <YesNoBtnGroup
            confirmBtnType="submit"
            confirmText="Update"
            declineText="Cancel"
            declineBtnType="button"
            onClickDecline={onClose}
            isLoading={isLoading}
          />
        </BorderCard>
      </form>
    </div>
  )
}
