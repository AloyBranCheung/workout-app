import { IRecentActivity } from "src/types/home-page"

const MOCK_RECENT_ACTIVITY: IRecentActivity[] = new Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index,
    date: 1688008833,
    workoutName: `Deezed-${index}`,
    workoutDuration: new Date().getTime() - 1688008833, // milliseconds
  }))

export default MOCK_RECENT_ACTIVITY
