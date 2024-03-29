import React from "react"
// components
import MainLayout from "src/components/MainLayout"
import CreateWorkout from "src/components/CreateWorkout"
import Fade from "src/components/UI/transitions/Fade"
import LoadingSpinner from "src/components/UI/LoadingSpinner"
// hooks
import useGetExercises from "src/hooks/useGetExercises"
import useGetGymLocations from "src/hooks/useGetGymLocations"

export default function CreateWorkoutPage() {
  const { data: exercises, isLoading: isLoadingExercises } = useGetExercises()
  const { data: gymLocations, isLoading: isLoadingGymLocations } =
    useGetGymLocations()

  const isLoading = isLoadingExercises || isLoadingGymLocations

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Fade>
      <CreateWorkout exercises={exercises} gymLocations={gymLocations} />
    </Fade>
  )
}

CreateWorkoutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
