export const MOCK_WORKOUT_PLANS = new Array(3).fill(0).map((_, index) => ({
  id: index,
  name: `Workout Plan ${index + 1}`,
  lastWorkout: 1688172643 / 1000, // in milliseconds
  duration: 3600, // seconds
}))
