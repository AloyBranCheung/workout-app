import React from "react"
// hooks
import useCurrActiveSesh from "src/hooks/useCurrActiveSesh"
import useGetSessionById from "src/hooks/useGetSessionById"
import LoadingSpinner from "../UI/LoadingSpinner"

export default function CurrActiveSeshContainer() {
  const { currActiveSeshId, isLoading: isCurrActiveSeshLoading } =
    useCurrActiveSesh()
  const { data: sessionRes, isLoading: isSessionLoading } =
    useGetSessionById(currActiveSeshId)

  const isLoading = isCurrActiveSeshLoading || isSessionLoading

  console.log(sessionRes)

  return isLoading ? <LoadingSpinner /> : <div>CurrActiveSeshContainer</div>
}
