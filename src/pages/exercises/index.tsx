import React from "react"
import MainLayout from "src/components/MainLayout"
import Exercises from "src/components/Exercises"
import useGetExercises from "src/hooks/useGetExercises"

export default function ExercisesPage() {
  const { data: exercises } = useGetExercises()
  return <Exercises exercises={exercises} />
}

ExercisesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
