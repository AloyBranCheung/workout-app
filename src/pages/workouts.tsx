import React from "react"
import MainLayout from "src/components/MainLayout"

export default function WorkoutsPage() {
  return (
    <div>
      <div>create a workout</div>
      <div>list available workouts</div>
    </div>
  )
}

WorkoutsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
