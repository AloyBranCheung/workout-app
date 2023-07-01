import React from "react"
import MainLayout from "src/components/MainLayout"
import CreateWorkout from "src/components/CreateWorkout"

export default function CreateWorkoutPage() {
  return <CreateWorkout />
}

CreateWorkoutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
