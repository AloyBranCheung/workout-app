import React from "react"
// components
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import MainLayout from "src/components/MainLayout"
import Workouts from "src/components/Workouts"
import Fade from "src/components/UI/transitions/Fade"
// hooks
import useGetWorkoutPlans from "src/hooks/useGetWorkoutPlans"
import useGetGymLocations from "src/hooks/useGetGymLocations"

export default function WorkoutsPage() {
  const { data: plans, isLoading: isLoadingWorkoutPlans } = useGetWorkoutPlans()
  const { data: gymLocations, isLoading: isLoadingGymLocations } =
    useGetGymLocations()

  const isLoading = isLoadingGymLocations || isLoadingWorkoutPlans

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Fade>
      <Workouts plans={plans} gymLocations={gymLocations} />
    </Fade>
  )
}

WorkoutsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
