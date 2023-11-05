/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from "react"
// types
import { GetGymLocationsOutput } from "src/types/trpc/router-types"
// hooks
import useMutationDeleteGymLocation from "src/hooks/useMutationDeleteGymLocation"
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
// components
import Text, { Typography } from "../UI/typography/Text"
import CRUD from "../UI/CRUD"
import AddGymLocationModal from "../CreateWorkout/AddGymLocationModal"
import Modal from "../UI/Modal"
import SecondaryButton from "../UI/SecondaryButton"
import CRUDCard from "../UI/CRUDCard"
import Warning from "../UI/Warning"
import EditGymLocationModal from "./EditGymLocationModal"

interface GymLocationsProps {
  gymLocations: GetGymLocationsOutput | undefined
}

export default function GymLocations({ gymLocations }: GymLocationsProps) {
  const [editGymId, setEditGymId] = useState("")
  const [isWarning, setIsWarning] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const toastMessage = useToastMessage()
  const { mutate } = useMutationDeleteGymLocation(
    () => {
      toastMessage("Gym location deleted successfully", ToastMessage.Success)
    },
    () =>
      toastMessage("Err: Unable to delete gym location.", ToastMessage.Error)
  )
  const [isCreate, setIsCreate] = useState(false)

  return (
    <CRUD
      onCreate={() => setIsCreate(true)}
      h3Text="Gym Locations"
      modals={
        <>
          <Modal
            isOpen={isCreate}
            onClose={() => setIsCreate(false)}
            cardTitle="Add Gym Location"
          >
            <AddGymLocationModal onSuccessAdd={() => setIsCreate(false)} />
          </Modal>
          <Modal
            isOpen={isEdit}
            onClose={() => {
              setIsEdit(false)
            }}
            cardTitle="Edit Gym Location"
          >
            <EditGymLocationModal
              editGymId={editGymId}
              onClickDecline={() => setIsEdit(false)}
            />
          </Modal>
        </>
      }
      secondaryCards={
        gymLocations && gymLocations.length > 0 ? (
          gymLocations.map(({ gymId, description, name }) => (
            <CRUDCard
              key={gymId}
              onClickEdit={() => {
                setIsEdit(true)
                setEditGymId(gymId)
              }}
              onClickDelete={() => setIsWarning(true)}
            >
              <div>
                <Text text={name} typography={Typography.p2} bold />
                <Text
                  text={description ? description : "no description"}
                  typography={Typography.p3}
                />
                <Warning
                  isOpen={isWarning}
                  onCloseModal={() => setIsWarning(false)}
                  warningMsg={
                    "All workout plans associated with this gym location will be deleted."
                  }
                  onConfirm={() => {
                    mutate({ gymId })
                    setIsWarning(false)
                  }}
                  onCancel={() => setIsWarning(false)}
                  warningTitle="You are about to delete a gym location."
                />
              </div>
            </CRUDCard>
          ))
        ) : (
          <SecondaryButton
            label="Get Started"
            type="button"
            onClick={() => setIsCreate(true)}
          />
        )
      }
    />
  )
}
