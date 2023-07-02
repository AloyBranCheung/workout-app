import React, { ReactElement } from "react"
import MainLayout from "src/components/MainLayout"
import useUserAttributes from "src/hooks/useUserAttributes"
import useStats from "src/hooks/useStats"
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import HomePage from "src/components/HomePage"
import Fade from "src/components/UI/transitions/Fade"

export default function Home() {
  const { data: userAttributes, isLoading: userAttributesIsLoading } =
    useUserAttributes()
  const { data: stats, isLoading: statsIsLoading } = useStats()

  const isLoading = userAttributesIsLoading || statsIsLoading

  return isLoading ? (
    <LoadingSpinner className="h-screen" />
  ) : (
    <Fade>
      <HomePage userAttributes={userAttributes} stats={stats} />
    </Fade>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
