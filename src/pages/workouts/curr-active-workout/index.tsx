import React from "react"
// hooks
import useCurrActiveSesh from "src/hooks/useCurrActiveSesh"
// components
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import MainLayout from "src/components/MainLayout"
import CurrActiveSeshContainer from "src/components/CurrActiveSesh"
import NoActiveSession from "src/components/CurrActiveSesh/NoActiveSession"

export default function CurrActiveWorkoutPage() {
  const { isLoading, isCurrActiveSeshPresent } = useCurrActiveSesh()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isCurrActiveSeshPresent) {
    return <NoActiveSession />
  }

  return <CurrActiveSeshContainer />
}

CurrActiveWorkoutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
