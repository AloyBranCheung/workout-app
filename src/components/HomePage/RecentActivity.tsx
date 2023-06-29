import React from "react"
// components
import SecondaryCard from "../UI/SecondaryCard"
import Card from "../UI/Card"
import Text1 from "../UI/typography/Text1"
// types/utils
import unixToIsoDate from "src/utils/unixToIsoDate"
import msToStrTime from "src/utils/msToStrTime"
import { IRecentActivity } from "src/types/home-page"

interface RecentActivityProps {
  recentActivities: IRecentActivity[]
}

export default function RecentActivity({
  recentActivities,
}: RecentActivityProps) {
  const recentActivitiesCards = recentActivities.map(
    ({ id, workoutDuration, workoutName, date }) => (
      <SecondaryCard key={id} className="flex flex-col gap-2">
        <div className="self-end">
          <strong>{unixToIsoDate(date)}</strong>
        </div>
        <div className="flex justify-between">
          <div>
            <strong>{workoutName}</strong>
          </div>
          <div>
            <strong>{new msToStrTime(workoutDuration).msToStrTime()}</strong>
          </div>
        </div>
      </SecondaryCard>
    )
  )

  return (
    <Card className="flex flex-col gap-5 py-6 px-3">
      <Text1 text="Recent Activity" bold />
      <div className="flex flex-col gap-7">{recentActivitiesCards}</div>
    </Card>
  )
}
