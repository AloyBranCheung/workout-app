import React, { useEffect, useMemo, useState } from "react"
import { z } from "zod"
// components
import PrimaryButton from "../UI/PrimaryButton"
import SecondaryButton from "../UI/SecondaryButton"
import Text from "../UI/typography/Text"
import ParentCard from "../UI/ParentCard"
import SecondaryCard from "../UI/SecondaryCard"
import EditIcon from "../UI/icons/EditIcon"
import TrashIcon from "../UI/icons/TrashIcon"
import Modal from "../UI/Modal"
import InspectIcon from "../UI/icons/InspectIcon"
import Confirmation from "../UI/Confirmation"
import AddExerciseForm from "./AddExerciseForm"
import ViewExercise from "./ViewExercise"
import EditExercise from "./EditExercise"
// hooks
import useMutationDeleteExercise from "src/hooks/useMutationDeleteExercise"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
// types/utils
import exerciseHash from "src/utils/exercises-hashmap"
import { GetExercisesOutput } from "src/types/trpc/router-types"
import useGetGymLocations from "src/hooks/useGetGymLocations"
import LoadingSpinner from "../UI/LoadingSpinner"
import SelectDropdown from "../UI/SelectDropdown"

interface ExercisesProps {
  exercises: GetExercisesOutput | undefined
}

export default function Exercises({ exercises }: ExercisesProps) {
  const { data: gymLocations, isLoading: isLoadingGymLocations } =
    useGetGymLocations()
  const [viewExercise, setViewExercise] = useState(false)
  const [editExercise, setEditExercise] = useState(false)
  const [isAddExercise, setIsAddExercise] = useState(false)
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("")
  const toastMessage = useToastMessage()
  const [currGymLocation, setCurrGymLocation] = useState("")

  const isLoading = isLoadingGymLocations

  const gymOptions =
    gymLocations?.map((loc) => ({
      id: loc.gymId,
      name: loc.name,
      value: loc.gymId,
    })) || []

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

  const exerciseName = exerciseHashmap[selectedExerciseId]?.name ?? ""

  const filtered = exercises?.filter((exerc) => exerc.gymId === currGymLocation)

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

  useEffect(() => {
    if (gymLocations) {
      setCurrGymLocation(gymLocations[0].gymId)
    }
  }, [gymLocations])

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col gap-10">
      <PrimaryButton
        label="add an exercise"
        type="button"
        className="w-full"
        onClick={() => setIsAddExercise(true)}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text text="Exercises" className="text-h3" />
          <SelectDropdown
            menuList={gymOptions}
            value={currGymLocation}
            onChange={(e) => setCurrGymLocation(e.target.value)}
          />
        </div>
        <ParentCard>
          {filtered && filtered.length > 0 ? (
            filtered.map(({ exerciseId, name }) => (
              <SecondaryCard
                key={exerciseId}
                className="flex justify-between items-center"
              >
                <Text text={name} className="text-p2" bold />
                <div className="flex gap-2 items-center justify-end">
                  <InspectIcon
                    onClick={() => {
                      setSelectedExerciseId(exerciseId)
                      setViewExercise(true)
                    }}
                  />
                  <EditIcon
                    onClick={() => {
                      setSelectedExerciseId(exerciseId)
                      setEditExercise(true)
                    }}
                  />
                  <TrashIcon
                    onClick={() => {
                      setSelectedExerciseId(exerciseId)
                      setIsConfirmDelete(true)
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
        <AddExerciseForm
          onClickCancel={handleCloseAddExercise}
          onSubmitSuccess={() => handleCloseAddExercise()}
        />
      </Modal>
      <Modal
        cardTitle="Are you sure?"
        isOpen={isConfirmDelete}
        onClose={handleCloseConfirmDelete}
      >
        <Confirmation
          onClickDecline={handleCloseConfirmDelete}
          description={`You are about to delete '${exerciseName}'. This action cannot be undone.`}
          onClickConfirm={handleClickConfirm}
        />
      </Modal>
      <Modal
        cardTitle={`Viewing ${exerciseName}`}
        isOpen={viewExercise}
        onClose={() => setViewExercise(false)}
      >
        <ViewExercise
          exercise={exerciseHashmap[selectedExerciseId]}
          onClose={() => setViewExercise(false)}
        />
      </Modal>
      <Modal
        cardTitle={`Editing ${exerciseName}`}
        isOpen={editExercise}
        onClose={() => setEditExercise(false)}
      >
        <EditExercise
          exercise={exerciseHashmap[selectedExerciseId]}
          onClose={() => setEditExercise(false)}
        />
      </Modal>
    </div>
  )
}
