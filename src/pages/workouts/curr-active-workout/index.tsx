import React from "react"
// hooks
import useCurrActiveSesh from "src/hooks/useCurrActiveSesh"
// components
import LoadingSpinner from "src/components/UI/LoadingSpinner"
import MainLayout from "src/components/MainLayout"

export default function CurrActiveWorkoutPage() {
  const { isLoadingCurrActiveSesh, isCurrActiveSeshPresent } =
    useCurrActiveSesh()

  const isLoading = isLoadingCurrActiveSesh

  return isLoading ? (
    <LoadingSpinner />
  ) : isCurrActiveSeshPresent ? (
    <div>hello sesh</div>
  ) : (
    <div>no sesh</div>
  )
}

CurrActiveWorkoutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
