import { IRecentActivity, ITopStats, WeightLifted } from "src/types/home-page"

const MOCK_RECENT_ACTIVITY: IRecentActivity[] = new Array(5)
  .fill(0)
  .map((_, index) => ({
    id: index.toString(),
    date: String(1688008833 * 1000), // unix milliseconds
    workoutName: `Deezed-${index}`,
    workoutDuration: Number(
      (new Date().getTime() - 1688008833 * 1000).toFixed(2) // unix milliseconds
    ), // milliseconds
  }))

export default MOCK_RECENT_ACTIVITY

const defaultWeight: WeightLifted = {
  weight: 89,
  unit: "kg",
}

export const MOCK_TOP_STATS: ITopStats = {
  big3: {
    squat: defaultWeight,
    bench: defaultWeight,
    deadlift: defaultWeight,
  },
  weightLiftedTotal: defaultWeight,
  randomGraph: {},
}
