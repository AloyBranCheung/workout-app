import React, { useMemo, useState } from "react"
import { useRouter } from "next/router"
// react-hook-forms
import { useForm } from "react-hook-form"
// dnd
import { verticalListSortingStrategy } from "@dnd-kit/sortable"
// hooks
import useDragSorting from "src/hooks/useDragSorting"
// components
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

interface CreateWorkoutProps {
  exercises: GetExercisesOutput | undefined
}

export default function CreateWorkout({ exercises }: CreateWorkoutProps) {
  const router = useRouter()
  const [isAddExercise, setIsAddExercise] = useState(false)
  const { items, handleDragEnd, setItems } = useDragSorting([])
  const { handleSubmit, reset, control } = useForm()

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

  const handleSubmitForm = (formData) => console.log("formdata", formData)

  const handleCloseModal = () => setIsAddExercise(false)

  const handleClickAdd = (exerciseId: string) =>
    setItems([...items, exerciseId])

  return (
    <div className="flex flex-col justify-center gap-5">
      <Text text="Create a Workout Plan" className="text-p1" bold />
      <ParentCard>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-6 justify-center"
        >
          <div>
            <FormInput control={control} name="name" />
          </div>
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
                    setsName={`${itemId}-sets`}
                    repsName={`${itemId}-reps`}
                  />
                ))}
              </DragSortable>
            </BorderCard>
          )}

          <div className="flex items-center justify-end gap-3">
            <SecondaryButton
              label="Cancel"
              type="button"
              className="py-2 px-3"
              onClick={() => router.back()}
            />
            <PrimaryButton label="Submit" type="submit" className="py-2 px-3" />
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
