import React, { useMemo, useState } from "react"
// components
import PrimaryButton from "../UI/PrimaryButton"
import SecondaryButton from "../UI/SecondaryButton"
import Text from "../UI/typography/Text"
import ParentCard from "../UI/ParentCard"
import SecondaryCard from "../UI/SecondaryCard"
import EditIcon from "../UI/icons/EditIcon"
import TrashIcon from "../UI/icons/TrashIcon"
import Modal from "../UI/Modal"
// types/utils
import exerciseHash from "src/utils/exercises-hashmap"
import { GetExercisesOutput } from "src/types/trpc/router-types"
import InspectIcon from "../UI/icons/InspectIcon"
import AddExercise from "../CreateWorkout/AddExercise"
import Confirmation from "../UI/Confirmation"
import useMutationDeleteExercise from "src/hooks/useMutationDeleteExercise"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import { z } from "zod"

interface ExercisesProps {
  exercises: GetExercisesOutput | undefined
}

export default function Exercises({ exercises }: ExercisesProps) {
  const [isAddExercise, setIsAddExercise] = useState(false)
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("")
  const toastMessage = useToastMessage()

  const { mutate } = useMutationDeleteExercise(
    () => {
      setIsConfirmDelete(false)
      toastMessage("Successfully deleted exercise", ToastMessage.Success)
    },
    () => {
      toastMessage("Failed to delete exercise", ToastMessage.Error)
    }
  )

  const exerciseHashmap = useMemo(() => exerciseHash(exercises), [exercises])

  const handleCloseAddExercise = () => setIsAddExercise(false)
  const handleCloseConfirmDelete = () => setIsConfirmDelete(false)
  const handleClickConfirm = () => {
    const validatedId = z.string().uuid().safeParse(selectedExerciseId)
    if (!validatedId.success) {
      toastMessage("Invalid exercise id", ToastMessage.Error)
      return
    }
    mutate(validatedId.data)
  }

  return (
    <div className="flex flex-col gap-10">
      <PrimaryButton
        label="add an exercise"
        type="button"
        className="w-full"
        onClick={() => setIsAddExercise(true)}
      />
      <div>
        <Text text="My Exercises" className="text-h3" />
        <ParentCard>
          {exercises && exercises.length > 0 ? (
            exercises.map(({ exerciseId, name }) => (
              <SecondaryCard
                key={exerciseId}
                className="flex justify-between items-center"
              >
                <Text text={name} className="text-p2" bold />
                <div className="flex gap-2 items-center justify-end">
                  <InspectIcon onClick={() => console.log("clicked")} />
                  <EditIcon onClick={() => console.log("clicked")} />
                  <TrashIcon
                    onClick={() => {
                      setIsConfirmDelete(true)
                      setSelectedExerciseId(exerciseId)
                    }}
                  />
                </div>
              </SecondaryCard>
            ))
          ) : (
            <SecondaryButton
              label="Get Started"
              type="button"
              onClick={() => setIsAddExercise(true)}
            />
          )}
        </ParentCard>
      </div>
      <Modal isOpen={isAddExercise} onClose={handleCloseAddExercise}>
        <AddExercise onClickCancel={handleCloseAddExercise} />
      </Modal>
      <Modal
        cardTitle="Are you sure?"
        isOpen={isConfirmDelete}
        onClose={handleCloseConfirmDelete}
      >
        <Confirmation
          onClickDecline={handleCloseConfirmDelete}
          description={`You are about to delete '${exerciseHashmap[selectedExerciseId]?.name}'. This action cannot be undone.`}
          onClickConfirm={handleClickConfirm}
        />
      </Modal>
    </div>
  )
}
