import React, { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/router"
// hooks
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import useMutationDeleteWorkoutPlan from "src/hooks/useMutationDeleteWorkoutPlan"
import useCurrActiveSesh from "src/hooks/useCurrActiveSesh"
// types/utils
import {
  GetGymLocationsOutput,
  GetWorkoutPlansOutput,
} from "src/types/trpc/router-types"
// components
import PrimaryButton from "../UI/PrimaryButton"
import Text, { Typography } from "../UI/typography/Text"
import ParentCard from "../UI/ParentCard"
import SecondaryButton from "../UI/SecondaryButton"
import Modal from "../UI/Modal"
import EditWorkoutPlan from "./EditWorkoutPlan"
import YesNoBtnGroup from "../UI/YesNoBtnGroup"
import SelectDropdown from "../UI/SelectDropdown"
import PlanCard from "./PlanCard"
import Confirmation from "../UI/Confirmation"

interface WorkoutsProps {
  plans: GetWorkoutPlansOutput | undefined
  gymLocations: GetGymLocationsOutput | undefined
}

export default function Workouts({ plans, gymLocations }: WorkoutsProps) {
  const { setCurrWorkoutPlanId } = useCurrActiveSesh()
  const [selectedGymLocation, setSelectedGymLocation] = useState("")
  const [selectedPlanId, setSelectedPlanId] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
  const [isStartWorkout, setIsStartWorkout] = useState(false)
  const router = useRouter()
  const toastMessage = useToastMessage()
  const { mutate } = useMutationDeleteWorkoutPlan(
    () => toastMessage("Successfully deleted workout.", ToastMessage.Success),
    () => toastMessage("Error deleting workout.", ToastMessage.Error)
  )

  const plansHashmap = useMemo(() => {
    if (!plans) return {}
    const hash: {
      [
        key: GetWorkoutPlansOutput[number]["planId"]
      ]: GetWorkoutPlansOutput[number]
    } = {}
    for (const plan of plans) {
      if (!(plan.planId in hash)) {
        hash[plan.planId] = plan
      }
    }
    return hash
  }, [plans])

  const handleCloseEdit = () => setIsEdit(false)

  const handleDeleteWorkout = (planId: string) => mutate(planId)

  // upgrade to reducer fn?
  const filteredPlans =
    (plans &&
      plans.length > 0 &&
      plans
        .filter((plan) => plan.gymId === selectedGymLocation)
        .map(({ planId, name, lastWorkout, duration, gymLocation }) => (
          <div key={planId}>
            <PlanCard
              onClickCard={(e) => {
                e.stopPropagation()
                setIsStartWorkout(true)
              }}
              name={name}
              planId={planId}
              gymLocation={gymLocation}
              lastWorkout={lastWorkout}
              duration={duration}
              onEditClick={() => {
                setSelectedPlanId(planId)
                setIsEdit(true)
              }}
              onDeleteClick={() => {
                setSelectedPlanId(planId)
                setIsConfirmDelete(true)
              }}
            />
            <Modal
              isOpen={isStartWorkout}
              onClose={() => setIsStartWorkout(false)}
            >
              <Confirmation
                description={`You are about to start ${name} workout plan. Are you sure?`}
                onClickConfirm={() => {
                  router.push("/workouts/curr-active-workout")
                  setCurrWorkoutPlanId(planId)
                }}
                onClickDecline={() => setIsStartWorkout(false)}
              />
            </Modal>
          </div>
        ))) ||
    []

  useEffect(() => {
    if (plans && plans.length > 0) {
      setSelectedGymLocation(plans[0].gymId)
    }
  }, [plans])

  return (
    <div className="flex flex-col justify-center w-full h-full gap-8">
      <PrimaryButton
        onClick={() => router.push("/workouts/create-workout")}
        label="create a plan"
        type="button"
        className="w-full"
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Text
            text="My Workouts"
            typography={Typography.h3}
            className="text-h3"
          />
          <SelectDropdown
            instruction="Select a location"
            value={selectedGymLocation}
            onChange={(e) => setSelectedGymLocation(e.target.value)}
            menuList={
              gymLocations?.map((gymLocation) => ({
                id: gymLocation.gymId,
                name: gymLocation.name,
                value: gymLocation.gymId,
              })) || []
            }
          />
        </div>
        <ParentCard cardTitle="">
          {filteredPlans && filteredPlans.length > 0 ? (
            filteredPlans
          ) : (
            <SecondaryButton
              onClick={() => router.push("/workouts/create-workout")}
              label="Get Started"
              type="button"
            />
          )}
        </ParentCard>
      </div>
      <Modal isOpen={isEdit} onClose={handleCloseEdit}>
        <EditWorkoutPlan
          workoutPlan={plansHashmap[selectedPlanId]}
          onClose={handleCloseEdit}
        />
      </Modal>
      <Modal
        cardTitle="Are you sure?"
        isOpen={isConfirmDelete}
        onClose={() => setIsConfirmDelete(false)}
      >
        <p>
          You are about to delete{" "}
          {<strong>{plansHashmap[selectedPlanId]?.name}</strong>}. Are you sure?
        </p>
        <YesNoBtnGroup
          onClickConfirm={() => {
            handleDeleteWorkout(selectedPlanId)
            setIsConfirmDelete(false)
          }}
          onClickDecline={() => setIsConfirmDelete(false)}
        />
      </Modal>
    </div>
  )
}
