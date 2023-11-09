import { useEffect, useState } from "react"
import useGetCurrActiveSesh from "./useGetCurrActiveSesh"

export default function useCurrActiveSesh() {
  const { data: currActiveSeshRes } = useGetCurrActiveSesh()
  const [isCurrActiveSeshPresent, setIsCurrActiveSeshPresent] = useState(false)

  useEffect(() => {
    if (currActiveSeshRes) {
      setIsCurrActiveSeshPresent(true)
    }
  }, [currActiveSeshRes])

  return { isCurrActiveSeshPresent }
}
