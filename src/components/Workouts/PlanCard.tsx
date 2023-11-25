import React, { useState } from "react"
import dayjs from "dayjs"
import { useRouter } from "next/router"
// hooks
import useCurrActiveSesh from "src/hooks/useCurrActiveSesh"
// utils/types
import MsToStrTime from "src/utils/MsToStrTime"
// components
import SecondaryCard from "../UI/SecondaryCard"
import Text, { Typography } from "../UI/typography/Text"
import EditIcon from "../UI/icons/EditIcon"
import TrashIcon from "../UI/icons/TrashIcon"
import Modal from "../UI/Modal"
import Confirmation from "../UI/Confirmation"

interface PlanCardProps {
  name: string
  planId: string
  gymLocation: { name: string }
  lastWorkout: string | null
  duration: number | null
  onEditClick: () => void
  onDeleteClick: () => void
}

export default function PlanCard({
  name,
  planId,
  gymLocation,
  lastWorkout,
  duration,
  onEditClick,
  onDeleteClick,
}: PlanCardProps) {
  const router = useRouter()

  const { setCurrWorkoutPlanId, isCurrActiveSeshPresent } = useCurrActiveSesh()

  const [isStartWorkout, setIsStartWorkout] = useState(false) // modal

  return (
    <SecondaryCard className="flex justify-between items-center">
      <div
        className={`"w-full ${!isCurrActiveSeshPresent && "cursor-pointer"}"`}
        onClick={(e) => {
          e.stopPropagation()
          if (!isCurrActiveSeshPresent) {
            setIsStartWorkout(true)
          }
        }}
      >
        <Text text={name} typography={Typography.p2} bold className="text-p2" />
        <div>
          <Text
            testId={`gymLocation-${planId}`}
            text={`Gym Location: ${
              gymLocation?.name ? gymLocation.name : "ERR: No location found."
            }`}
            typography={Typography.p3}
            className="text-p3"
          />
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
        <EditIcon onClick={onEditClick} />
        <TrashIcon onClick={onDeleteClick} />
      </div>
      <Modal isOpen={isStartWorkout} onClose={() => setIsStartWorkout(false)}>
        <Confirmation
          description={`You are about to start ${name} workout plan. Are you sure?`}
          onClickConfirm={() => {
            router.push("/workouts/curr-active-workout")
            setCurrWorkoutPlanId(planId)
          }}
          onClickDecline={() => setIsStartWorkout(false)}
        />
      </Modal>
    </SecondaryCard>
  )
}

// <SecondaryCard
//   key={planId}
//   className="flex justify-between items-center"
// >
//   <div>
//     <Text
//       text={name}
//       typography={Typography.p2}
//       bold
//       className="text-p2"
//     />
//     <div>
//       <Text
//         testId={`gymLocation-${planId}`}
//         text={`Gym Location: ${
//           gymLocation?.name
//             ? gymLocation.name
//             : "ERR: No location found."
//         }`}
//         typography={Typography.p3}
//         className="text-p3"
//       />
//       <Text
//         testId={`last-workout-${planId}`}
//         text={`Last Workout: ${
//           lastWorkout
//             ? dayjs(lastWorkout).format("YYYY-MM-DD")
//             : "Get Started :)"
//         }`}
//         typography={Typography.p3}
//         className="text-p3"
//       />
//       <Text
//         testId={`workout-duration-${planId}`}
//         text={`Duration: ${
//           duration
//             ? new MsToStrTime(duration).msToStrTime()
//             : "Get Started :)"
//         } `}
//         typography={Typography.p3}
//         className="text-p3"
//       />
//     </div>
//   </div>
//   <div className="flex flex-col gap-2">
//     <EditIcon
//       onClick={() => {
//         setSelectedPlanId(planId)
//         setIsEdit(true)
//       }}
//     />
//     <TrashIcon
//       onClick={() => {
//         setSelectedPlanId(planId)
//         setIsConfirmDelete(true)
//       }}
//     />
//   </div>
// </SecondaryCard>
