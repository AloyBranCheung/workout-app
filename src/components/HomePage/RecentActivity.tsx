import React from "react"
import Card from "../UI/Card"
import Text1 from "../UI/typography/Text1"
// types
import { IRecentActivity } from "src/types/home-page"

interface RecentActivityProps {
  recentActivities: IRecentActivity[]
}

export default function RecentActivity({
  recentActivities,
}: RecentActivityProps) {
  const recentActivitiesCards = recentActivities.map((activityObj) => (
    <div key={activityObj.id}>hello world</div>
  ))

  return (
    <Card className="flex flex-col gap-5 py-6 px-3">
      <Text1 text="Recent Activity" bold />
      <div className="flex flex-col gap-7">{recentActivitiesCards}</div>
    </Card>
  )
}
