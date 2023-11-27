import React from "react"
// recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts"
// components
import ParentCard from "../UI/ParentCard"
import { ITopStats } from "src/types/home-page"
import SecondaryCard from "../UI/SecondaryCard"
import Text from "../UI/typography/Text"

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
            <strong>Big 3</strong>
          </p>
          <div className="flex flex-col gap-2">{big3Lifts}</div>
        </SecondaryCard>
        <SecondaryCard>
          <p>
            <strong>Total kg Lifted This Week</strong>
          </p>
          <div className="flex items-center justify-center">
            <p className="p-8">
              <strong>{`${topStats.weightLiftedTotal.weight} ${topStats.weightLiftedTotal.unit}`}</strong>
            </p>
          </div>
        </SecondaryCard>
        <SecondaryCard className="w-full h-[60vh]">
          <Text
            text={topStats.randomGraph.exerciseName}
            className="text-center w-full"
            bold
          />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={topStats.randomGraph.data}
              margin={{ bottom: 70, left: 10, top: 15, right: 15 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" />
              <YAxis width={50}>
                <Label
                  value={`Weight (${topStats.randomGraph.unit})`}
                  position="insideLeft"
                  angle={-90}
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#2f08a6"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </SecondaryCard>
      </div>
    </ParentCard>
  )
}
