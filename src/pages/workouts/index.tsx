import React from "react"
// components
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import MainLayout from "src/components/MainLayout"
import Workouts from "src/components/Workouts"
import Fade from "src/components/UI/transitions/Fade"
// hooks
import useWorkoutPlans from "src/hooks/useWorkoutPlans"

export default function WorkoutsPage() {
  const { data: plans, isLoading } = useWorkoutPlans()
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Fade>
      <Workouts plans={plans} />
    </Fade>
  )
}

WorkoutsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
