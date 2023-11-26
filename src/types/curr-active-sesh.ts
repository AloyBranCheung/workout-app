import WeightEnum from "./weight-enum"

export interface ISet {
  frontendSetId?: string // which set number it is
  weight: string
  unit: string | WeightEnum
  reps: number | null
  isDone: boolean
  sessionId: string
  exerciseId: string
  setNumber: number
  exerciseName: string
}
