/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from "react"
// types
import { GetGymLocationsOutput } from "src/types/trpc/router-types"
// components
import Text, { Typography } from "../UI/typography/Text"
import CRUD from "../UI/CRUD"
import AddGymLocationModal from "../CreateWorkout/AddGymLocationModal"
import Modal from "../UI/Modal"
import SecondaryButton from "../UI/SecondaryButton"
import CRUDCard from "../UI/CRUDCard"

interface GymLocationsProps {
  gymLocations: GetGymLocationsOutput | undefined
}

export default function GymLocations({ gymLocations }: GymLocationsProps) {
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
        </>
      }
      secondaryCards={
        gymLocations && gymLocations.length > 0 ? (
          gymLocations.map(({ gymId, description, name }) => (
            <CRUDCard
              key={gymId}
              onClickEdit={() => console.log("clicked edit")}
              onClickDelete={() => console.log("clicked delete")}
            >
              <div>
                <Text text={name} typography={Typography.p2} bold />
                <Text
                  text={description ? description : "no description"}
                  typography={Typography.p3}
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
