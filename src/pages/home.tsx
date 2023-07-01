import React, { ReactElement } from "react"
import MainLayout from "src/components/MainLayout"
import useUserAttributes from "src/hooks/useUserAttributes"
import useStats from "src/hooks/useStats"
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import HomePage from "src/components/HomePage"

export default function Home() {
  const { data: userAttributes, isLoading } = useUserAttributes()
  const { data: stats } = useStats()

  return isLoading ? (
    <LoadingSpinner className="h-screen" />
  ) : (
    <HomePage userAttributes={userAttributes} stats={stats} />
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
