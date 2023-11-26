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

export interface ITopStats {
  big3: {
    squat: WeightLifted
    bench: WeightLifted
    deadlift: WeightLifted
  }
  weightLiftedTotal: WeightLifted
  randomGraph: object // TODO: pending
}
