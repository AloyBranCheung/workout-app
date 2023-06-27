import React, { ReactElement } from "react"
import MainLayout from "src/components/MainLayout"
import GutterContainer from "src/components/UI/GutterContainer"
import useUserAttributes from "src/hooks/useUserAttributes"
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import HomePage from "src/components/HomePage"

export default function Home() {
  const { data: userAttributes, isLoading } = useUserAttributes()

  return (
    <GutterContainer>
      {isLoading ? (
        <LoadingSpinner className="h-screen" />
      ) : (
        <HomePage userAttributes={userAttributes} />
      )}
    </GutterContainer>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
