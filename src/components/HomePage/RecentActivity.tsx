import React, { useState } from "react"
// types/utils
import unixToIsoDate from "src/utils/unix-to-ISO-date"
import MsToStrTime from "src/utils/MsToStrTime"
import { IRecentActivity } from "src/types/home-page"
// hooks
import useGetActivities from "src/hooks/useGetActivities"
// components
import SecondaryCard from "../UI/SecondaryCard"
import ParentCard from "../UI/ParentCard"
import Modal from "../UI/Modal"

interface RecentActivityProps {
  recentActivities: IRecentActivity[]
}

export default function RecentActivity({
  recentActivities,
}: RecentActivityProps) {
  const [selectedId, setSelectedId] = useState("")
  const [isOpenRecentActivity, setIsOpenRecentActivity] = useState(false)

  const { data: activityData, isLoading: isActivityLoading } =
    useGetActivities(selectedId)

  const currRecentActivity = (() => {
    const hash: { [activityId: string]: IRecentActivity } = {}
    for (const activity of recentActivities) {
      if (!(activity.id in hash)) {
        hash[activity.id] = activity
      }
    }
    return hash[selectedId]
  })()

  const recentActivitiesCards = recentActivities.map(
    ({ id, workoutDuration, workoutName, date }) => (
      <SecondaryCard
        key={id}
        className="flex flex-col gap-2 cursor-pointer"
        onClick={() => {
          setIsOpenRecentActivity(true)
          setSelectedId(id)
        }}
      >
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
      <div className="flex flex-col gap-7">
        {recentActivitiesCards.length > 0
          ? recentActivitiesCards
          : "Start a workout to get started :)"}
      </div>
      <Modal
        cardTitle="Recent Activity"
        isOpen={isOpenRecentActivity}
        onClose={() => setIsOpenRecentActivity(false)}
      >
        <div className="w-full flex flex-col">
          <p>
            <b>Date: </b>
            {unixToIsoDate(currRecentActivity?.date)}
          </p>
          <p>
            <b>Workout: </b>
            {currRecentActivity?.workoutName}
          </p>
          <p>
            <b>Duration: </b>
            {new MsToStrTime(currRecentActivity?.workoutDuration).msToStrTime()}
          </p>
        </div>
      </Modal>
    </ParentCard>
  )
}
