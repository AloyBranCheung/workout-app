import React, { ReactElement } from "react"
import MainLayout from "src/components/MainLayout"
import GutterContainer from "src/components/UI/GutterContainer"
import useUserAttributes from "src/hooks/useUserAttributes"
import useStats from "src/hooks/useStats"
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import HomePage from "src/components/HomePage"
import Fade from "src/components/UI/transitions/Fade"

export default function Home() {
  const { data: userAttributes, isLoading } = useUserAttributes()
  const { data: stats } = useStats()

  console.log('stats', stats)

  return (
    <Fade>
      <GutterContainer>
        {isLoading ? (
          <LoadingSpinner className="h-screen" />
        ) : (
          <HomePage userAttributes={userAttributes} stats={stats} />
        )}
      </GutterContainer>
    </Fade>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
