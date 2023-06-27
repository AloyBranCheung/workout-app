import React from "react"
// components
import PrimaryButton from "../UI/PrimaryButton"
// types
import { UserAttributesOutput } from "src/types/trpc/user-router"
import SecondaryButton from "../UI/SecondaryButton"

interface HomePageProps {
  userAttributes: UserAttributesOutput | undefined | null
}

export default function HomePage({ userAttributes }: HomePageProps) {
  return (
    <div
      className={`p-5 flex flex-col items-center justify-center gap-12 h-full`}
    >
      <h1 className="text-4xl">{`Hey ${
        userAttributes?.name ?? "{Error: Name not found.}"
      }. Let's have a good workout today :)`}</h1>
      <div className="flex flex-col gap-5">
        <PrimaryButton
          label="start getting deezed"
          type="button"
          className="w-full"
        />
        <SecondaryButton label="exercises" type="button" className="w-full" />
        <SecondaryButton label="workouts" type="button" className="w-full" />
        <SecondaryButton label="runs" type="button" className="w-full" />
      </div>
    </div>
  )
}
