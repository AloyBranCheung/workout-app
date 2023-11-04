import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
// react-hook-forms
import { useForm, FieldValues } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
// dnd
import { verticalListSortingStrategy } from "@dnd-kit/sortable"
// hooks
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import useDragSorting from "src/hooks/useDragSorting"
import useMutationAddWorkoutPlan from "src/hooks/useMutationAddWorkoutPlan"
// components
import FormErrMsg from "../UI/FormErrorMsg"
import DragSortable from "../UI/DragSortable"
import Text from "../UI/typography/Text"
import ParentCard from "../UI/ParentCard"
import FormInput from "../UI/FormInput"
import PrimaryButton from "../UI/PrimaryButton"
import SecondaryButton from "../UI/SecondaryButton"
import ExerciseCard from "./ExerciseCard"
import Modal from "../UI/Modal"
import AddExercise from "./AddExercise"
import { GetExercisesOutput } from "src/types/trpc/router-types"
import exerciseHash from "src/utils/exercises-hashmap"
import BorderCard from "../UI/BorderCard"
// types
import WorkoutPlanSchema from "src/validators/workout-schema"

interface CreateWorkoutProps {
  exercises: GetExercisesOutput | undefined
}

export default function CreateWorkout({ exercises }: CreateWorkoutProps) {
  const router = useRouter()
  const toastMessage = useToastMessage()
  const [isAddExercise, setIsAddExercise] = useState(false)
  const { items, handleDragEnd, setItems } = useDragSorting([])
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof WorkoutPlanSchema> & FieldValues>({
    defaultValues: {
      name: "",
      exercises: {},
      exerciseOrder: [],
    },
    resolver: zodResolver(WorkoutPlanSchema),
  })
  const { mutate, isLoading } = useMutationAddWorkoutPlan(
    () => {
      toastMessage("Successfully added workout plan.", ToastMessage.Success)
      reset()
      setItems([])
      router.push("/workouts")
    },
    () => {
      toastMessage("Failed to add workout plan.", ToastMessage.Error)
    }
  )

  const exercisesHashmap = useMemo(() => exerciseHash(exercises), [exercises])
  const itemsHash = useMemo(() => {
    const hash: { [key: string]: boolean } = {}
    for (const item of items) {
      if (!(item in items)) {
        hash[item] = true
      }
    }
    return hash
  }, [items])

  const handleSubmitForm = (formData: z.infer<typeof WorkoutPlanSchema>) => {
    // formData.exerciseOrder = items as string[]
    mutate(formData)
  }

  const handleCloseModal = () => setIsAddExercise(false)

  const handleClickAdd = (exerciseId: string) =>
    setItems([...items, exerciseId])

  // fixes validation error for min 1 required onSubmit
  useEffect(() => {
    setValue("exerciseOrder", items as string[])
  }, [items, setValue])

  return (
    <div className="flex flex-col justify-center gap-5">
      <Text text="Create a Workout Plan" className="text-p1" bold />
      <ParentCard>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-6 justify-center"
        >
          <FormInput control={control} name="name" />
          <SecondaryButton
            label="Add Exercise"
            type="button"
            onClick={() => setIsAddExercise(true)}
          />
          {items.length > 0 && (
            <BorderCard>
              <DragSortable
                items={items}
                sortingStrategy={verticalListSortingStrategy}
                onDragEnd={handleDragEnd}
              >
                {items.map((itemId) => (
                  <ExerciseCard
                    exerciseId={itemId.toString()}
                    key={itemId}
                    control={control}
                    exerciseName={exercisesHashmap[itemId].name}
                    setsName={`exercises.${itemId}.sets`}
                    repsName={`exercises.${itemId}.reps`}
                  />
                ))}
              </DragSortable>
            </BorderCard>
          )}
          <ErrorMessage
            errors={errors}
            name="exerciseOrder"
            render={({ message }) => (
              <FormErrMsg className="self-end" text={message} />
            )}
          />
          <div className="flex items-center justify-end gap-3">
            <SecondaryButton
              label="Cancel"
              type="button"
              className="py-2 px-3"
              onClick={() => router.back()}
            />
            <PrimaryButton
              label="Submit"
              type="submit"
              className="py-2 px-3"
              isLoading={isLoading}
            />
          </div>
        </form>
      </ParentCard>
      <Modal
        isOpen={isAddExercise}
        onClose={handleCloseModal}
        cardTitle="Add Exercise"
      >
        <AddExercise
          exercises={
            exercises?.filter(
              (exercise) => !(exercise.exerciseId in itemsHash)
            ) || []
          }
          onClickCancel={handleCloseModal}
          onClickAdd={handleClickAdd}
        />
      </Modal>
    </div>
  )
}
