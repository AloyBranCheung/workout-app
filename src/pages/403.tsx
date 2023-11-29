import React, { useEffect } from "react"
import { useRouter } from "next/router"
// components
import Button from "src/components/UI/Button"
import useTimer from "src/hooks/useTimer"

const FIVE_MILLI_SEC = 5000

export default function Page403() {
  const router = useRouter()
  const { countdown, startTimer } = useTimer(FIVE_MILLI_SEC, "s", 1000, () => {
    router.push("/login")
  })

  useEffect(() => {
    startTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-2 w-full h-screen items-center justify-center">
      <h1>403</h1>
      <p>{`Unauthorized, redirecting you in ${countdown} seconds...`} </p>
      <Button
        type="button"
        label="Go to login"
        onClick={() => router.replace("/login")}
      />
    </div>
  )
}
