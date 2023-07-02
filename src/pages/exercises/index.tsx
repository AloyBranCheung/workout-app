import React from "react"
import MainLayout from "src/components/MainLayout"
import Exercises from "src/components/Exercises"
import useGetExercises from "src/hooks/useGetExercises"
import LoadingSpinner from "src/components/UI/LoadingSpinner"

export default function ExercisesPage() {
  const { data: exercises, isLoading } = useGetExercises()
  return isLoading ? <LoadingSpinner /> : <Exercises exercises={exercises} />
}

ExercisesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
