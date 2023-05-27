import React from "react"
import { useRouter } from "next/router"
import Button from "src/components/UI/Button"

export default function Page404() {
  const router = useRouter()

  return (
    <div>
      Page Not Found
      <Button
        type="button"
        label="Go to login"
        onClick={() => router.replace("/login")}
      />
    </div>
  )
}
