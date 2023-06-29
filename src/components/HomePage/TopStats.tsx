import React from "react"
// components
import ParentCard from "../UI/ParentCard"
import { ITopStats } from "src/types/home-page"
import SecondaryCard from "../UI/SecondaryCard"

interface TopStatsProps {
  topStats: ITopStats
}

export default function TopStats({ topStats }: TopStatsProps) {
  const big3Lifts = Object.keys(topStats.big3).map((lift) => {
    const liftObject = topStats.big3[lift as keyof typeof topStats.big3]

    return (
      <div key={lift} className="flex items-center justify-between">
        <p>{lift}</p>
        <p>{`${liftObject.weight} ${liftObject.unit}`}</p>
      </div>
    )
  })

  return (
    <ParentCard cardTitle="Top Stats">
      <div className="flex flex-col gap-8">
        <SecondaryCard className="flex flex-col gap-3">
          <p>
            <strong>big 3</strong>
          </p>
          <div className="flex flex-col gap-2">{big3Lifts}</div>
        </SecondaryCard>
        <SecondaryCard>
          <p>
            <strong>total kg lifted this week</strong>
          </p>
          <div className="flex items-center justify-center">
            <p className="p-8">
              <strong>{`${topStats.weightLiftedTotal.weight} ${topStats.weightLiftedTotal.unit}`}</strong>
            </p>
          </div>
        </SecondaryCard>
        <SecondaryCard>Recharts Graph Here for Random Lift</SecondaryCard>
      </div>
    </ParentCard>
  )
}
