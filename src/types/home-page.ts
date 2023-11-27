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

export type RechartsData = { [key: string]: string | number }
export interface ITopStats {
  big3: {
    [key: string]: WeightLifted
  }
  weightLiftedTotal: WeightLifted
  randomGraph: {
    exerciseName: string
    unit: Units
    data: RechartsData[]
  }
}
