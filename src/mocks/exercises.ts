import { GetExercisesOutput } from "src/types/trpc/router-types"

const MOCK_EXERCISES: GetExercisesOutput = new Array(5).fill(0).map((_, i) => ({
  name: `Exercise ${i + 1}`,
  url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
  description: `This is a description for exercise ${i + 1}`,
  exerciseId: `${i + 1}`,
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  userId: "1",
  gymLocations: { name: `test${i}`, gymId: `${i}` },
  gymId: `test${i}`,
  unit: "kg",
  targetReps: 8,
  targetSets: 3,
}))

export default MOCK_EXERCISES
