import React, { ReactElement } from "react"
import MainLayout from "src/components/MainLayout"
import GutterContainer from "src/components/UI/GutterContainer"
import useUserAttributes from "src/hooks/useUserAttributes"
import useStats from "src/hooks/useStats"
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import HomePage from "src/components/HomePage"

export default function Home() {
  const { data: userAttributes, isLoading } = useUserAttributes()
  const { data: stats } = useStats()

  return (
    <GutterContainer>
      {isLoading ? (
        <LoadingSpinner className="h-screen" />
      ) : (
        <HomePage userAttributes={userAttributes} stats={stats} />
      )}
    </GutterContainer>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
