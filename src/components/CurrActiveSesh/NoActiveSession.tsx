import React from "react"
import { useRouter } from "next/router"
// components
import Text from "../UI/typography/Text"
import Card from "../UI/Card"
import PrimaryButton from "../UI/PrimaryButton"

export default function NoActiveSession() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center h-[30vh]">
      <Card className="h-[20vh]">
        <div className="flex flex-col gap-4 text-center items-center justify-center h-full">
          <Text text="No active workout currently." />
          <PrimaryButton
            label="Get one started."
            type="button"
            onClick={() => {
              router.push("/workouts")
            }}
          />
        </div>
      </Card>
    </div>
  )
}
