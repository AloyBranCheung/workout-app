import React from "react"
import { useRouter } from "next/router"
// components
import MainLayout from "src/components/MainLayout"
import Summary from "../../../components/Summary"
import { ISet } from "src/types/curr-active-sesh"

export default function SummaryPage() {
  const router = useRouter()
  const { data } = router.query
  const completedSets = data && (JSON.parse(data as string) as ISet[])

  if (!completedSets || !completedSets.length) {
    return router.push("/workouts")
  }

  return <Summary completedSets={completedSets} />
}

SummaryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
