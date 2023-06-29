import { IRecentActivity } from "src/types/home-page"

const MOCK_RECENT_ACTIVITY: IRecentActivity[] = new Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index,
    date: 1688008833 * 1000, // unix milliseconds
    workoutName: `Deezed-${index}`,
    workoutDuration: Number(
      (new Date().getTime() - 1688008833 * 1000).toFixed(2) // unix milliseconds
    ), // milliseconds
  }))

export default MOCK_RECENT_ACTIVITY
