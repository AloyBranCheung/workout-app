import React from "react"
import { useRouter } from "next/router"
// components
import PrimaryButton from "../UI/PrimaryButton"
import Text, { Typography } from "../UI/typography/Text"
import SecondaryCard from "../UI/SecondaryCard"
import ParentCard from "../UI/ParentCard"
// types/utils
import MsToStrTime from "src/utils/MsToStrTime"
import { GetWorkoutPlansOutput } from "src/types/trpc/router-types"
import SecondaryButton from "../UI/SecondaryButton"
import unixToIsoDate from "src/utils/unix-to-ISO-date"

interface WorkoutsProps {
  plans: GetWorkoutPlansOutput | undefined
}

export default function Workouts({ plans }: WorkoutsProps) {
  const router = useRouter()
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
              <SecondaryCard key={planId}>
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
                        ? unixToIsoDate(lastWorkout)
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
    </div>
  )
}
