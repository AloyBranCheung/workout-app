import React from "react"
import MainLayout from "src/components/MainLayout"
import CreateWorkout from "src/components/CreateWorkout"
import Fade from "src/components/UI/transitions/Fade"

export default function CreateWorkoutPage() {
  return (
    <Fade>
      <CreateWorkout />
    </Fade>
  )
}

CreateWorkoutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
