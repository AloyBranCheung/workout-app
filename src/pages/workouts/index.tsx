import React from "react"
import MainLayout from "src/components/MainLayout"
import Workouts from "src/components/Workouts"
// hooks
import useWorkoutPlans from "src/hooks/useWorkoutPlans"

export default function WorkoutsPage() {
  const { data: plans } = useWorkoutPlans()
  return <Workouts plans={plans} />
}

WorkoutsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
