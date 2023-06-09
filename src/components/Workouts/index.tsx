import React, { useState, useMemo } from "react"
import { useRouter } from "next/router"
import dayjs from "dayjs"
// hooks
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
import useMutationDeleteWorkoutPlan from "src/hooks/useMutationDeleteWorkoutPlan"
// types/utils
import MsToStrTime from "src/utils/MsToStrTime"
import { GetWorkoutPlansOutput } from "src/types/trpc/router-types"
// components
import PrimaryButton from "../UI/PrimaryButton"
import Text, { Typography } from "../UI/typography/Text"
import SecondaryCard from "../UI/SecondaryCard"
import ParentCard from "../UI/ParentCard"
import SecondaryButton from "../UI/SecondaryButton"
import EditIcon from "../UI/icons/EditIcon"
import TrashIcon from "../UI/icons/TrashIcon"
import Modal from "../UI/Modal"
import EditWorkoutPlan from "./EditWorkoutPlan"
import YesNoBtnGroup from "../UI/YesNoBtnGroup"

interface WorkoutsProps {
  plans: GetWorkoutPlansOutput | undefined
}

export default function Workouts({ plans }: WorkoutsProps) {
  const [selectedPlanId, setSelectedPlanId] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)
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
  return (
    <div className="flex flex-col justify-center w-full h-full gap-8">
      <PrimaryButton
        onClick={() => router.push("/workouts/create-workout")}
        label="create a plan"
        type="button"
        className="w-full"
      />
      <div className="flex flex-col gap-5">
        <Text
          text="My Workouts"
          typography={Typography.h3}
          className="text-h3"
        />
        <ParentCard cardTitle="">
          {plans && plans.length > 0 ? (
            plans.map(({ planId, name, lastWorkout, duration }) => (
              <SecondaryCard
                key={planId}
                className="flex justify-between items-center"
              >
                <div>
                  <Text
                    text={name}
                    typography={Typography.p2}
                    bold
                    className="text-p2"
                  />
                  <div>
                    <Text
                      testId={`last-workout-${planId}`}
                      text={`Last Workout: ${
                        lastWorkout
                          ? dayjs(lastWorkout).format("YYYY-MM-DD")
                          : "Get Started :)"
                      }`}
                      typography={Typography.p3}
                      className="text-p3"
                    />
                    <Text
                      testId={`workout-duration-${planId}`}
                      text={`Duration: ${
                        duration
                          ? new MsToStrTime(duration).msToStrTime()
                          : "Get Started :)"
                      } `}
                      typography={Typography.p3}
                      className="text-p3"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <EditIcon
                    onClick={() => {
                      setSelectedPlanId(planId)
                      setIsEdit(true)
                    }}
                  />
                  <TrashIcon
                    onClick={() => {
                      setSelectedPlanId(planId)
                      setIsConfirmDelete(true)
                    }}
                  />
                </div>
              </SecondaryCard>
            ))
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
