import Units from "src/constants/units"

export interface IRecentActivity {
  id: string
  date: string // unix seconds
  workoutName: string
  workoutDuration: number // unix seconds
}

export interface WeightLifted {
  weight: number
  unit: string
}

type RechartsDataX = { name: string }
type RechartsDataY = { [value: string]: number | string }
export type RechartsData = RechartsDataX & RechartsDataY
export interface ITopStats {
  big3: {
    squat: WeightLifted
    bench: WeightLifted
    deadlift: WeightLifted
  }
  weightLiftedTotal: WeightLifted
  randomGraph: {
    exerciseName: string
    unit: Units
    data: RechartsData[]
  }
}
