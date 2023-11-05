import React from "react"
// hooks
import useGetGymLocations from "src/hooks/useGetGymLocations"
// components
import MainLayout from "src/components/MainLayout"
import GymLocationsContainer from "src/components/GymLocations"
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import Fade from "src/components/UI/transitions/Fade"

export default function GymLocations() {
  const { data, isLoading } = useGetGymLocations()

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Fade>
      <GymLocationsContainer gymLocations={data} />
    </Fade>
  )
}

GymLocations.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
