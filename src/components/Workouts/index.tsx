import React from "react"
import { useRouter } from "next/router"
// components
import PrimaryButton from "../UI/PrimaryButton"
import Text, { Typography } from "../UI/typography/Text"
import SecondaryCard from "../UI/SecondaryCard"
import ParentCard from "../UI/ParentCard"
// types
import { WorkoutGetPlansOutput } from "src/types/trpc/router-types"
import SecondaryButton from "../UI/SecondaryButton"

interface WorkoutsProps {
  plans: WorkoutGetPlansOutput | undefined
}

export default function Workouts({ plans }: WorkoutsProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center w-full h-full gap-10">
      <PrimaryButton
        onClick={() => router.push("/workouts/create-workout")}
        label="create a plan"
        type="button"
        className="w-full"
      />
      <div className="flex flex-col gap-5">
        <Text text="My Workouts" typography={Typography.h3} />
        <ParentCard cardTitle="">
          {plans && plans.workoutPlans.length > 1 ? (
            plans.workoutPlans.map(({ id, duration, lastWorkout, name }) => (
              <SecondaryCard key={id}>hello world</SecondaryCard>
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
    </div>
  )
}
