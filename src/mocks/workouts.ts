import { GetWorkoutPlansOutput } from "src/types/trpc/router-types"

export const MOCK_WORKOUT_PLANS: GetWorkoutPlansOutput = new Array(3)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: `Workout Plan ${index + 1}`,
    lastWorkout: "1688172643 * 1000", // in milliseconds
    duration: 3600, // seconds
    updatedAt: "12312",
    createdAt: "12312",
    userId: "12312",
    exerciseOrder: ["12312", "12323232"],
    planId: `${index}`,
  }))
