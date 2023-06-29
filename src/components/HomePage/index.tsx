import React from "react"
// components
import PrimaryButton from "../UI/PrimaryButton"
import RecentActivity from "./RecentActivity"
import TopStats from "./TopStats"
import SecondaryButton from "../UI/SecondaryButton"
// types
import { StatsOutput, UserAttributesOutput } from "src/types/trpc/router-types"
import { ITopStats, WeightLifted } from "src/types/home-page"

const defaultWeight: WeightLifted = {
  weight: 0,
  unit: "",
}

const defaultTopStats: ITopStats = {
  big3: {
    squat: defaultWeight,
    bench: defaultWeight,
    deadlift: defaultWeight,
  },
  weightLiftedTotal: defaultWeight,
  randomGraph: {},
}
interface HomePageProps {
  userAttributes: UserAttributesOutput | undefined
  stats: StatsOutput | undefined
}

export default function HomePage({ userAttributes, stats }: HomePageProps) {
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
      <RecentActivity recentActivities={stats?.recentActivity || []} />
      <TopStats topStats={stats?.topStats || defaultTopStats} />
    </div>
  )
}
