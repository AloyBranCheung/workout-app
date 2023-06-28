import React from "react"
import Card from "../UI/Card"
import Text1 from "../UI/typography/Text1"

// TODO: what sort of recent activity data will we show? (e.g. date, name, sets, type (weights vs runs))
interface RecentActivityProps {
  recentActivities: { hello: string }[]
}

export default function RecentActivity() {
  return (
    <Card>
      <Text1 text="Recent Activity" bold />
    </Card>
  )
}
