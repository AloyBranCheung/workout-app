import React from "react"
import { useRouter } from "next/router"
// components
import MainLayout from "src/components/MainLayout"

export default function SummaryPage() {
  const router = useRouter()
  const { data } = router.query
  const completedSets = data && JSON.parse(data as string)

  if (!completedSets || !completedSets.length) {
    router.push("/workouts")
  }

  return <div>summary</div>
}

SummaryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
