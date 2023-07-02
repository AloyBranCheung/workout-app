import React from "react"
// components
import SecondaryCard from "../UI/SecondaryCard"
import ParentCard from "../UI/ParentCard"
// types/utils
import unixToIsoDate from "src/utils/unix-to-ISO-date"
import MsToStrTime from "src/utils/MsToStrTime"
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
            <strong>{new MsToStrTime(workoutDuration).msToStrTime()}</strong>
          </div>
        </div>
      </SecondaryCard>
    )
  )

  return (
    <ParentCard cardTitle="Recent Activity">
      <div className="flex flex-col gap-7">{recentActivitiesCards}</div>
    </ParentCard>
  )
}
