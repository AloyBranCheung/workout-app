import { GetExercisesOutput } from "src/types/trpc/router-types"

const exerciseHash = (exercises: GetExercisesOutput | undefined) => {
  if (!exercises) return {}
  const hashmap: { [key: string]: GetExercisesOutput[number] } = {}
  for (const exercise of exercises) {
    if (!(exercise.exerciseId in hashmap)) {
      hashmap[exercise.exerciseId] = exercise
    }
  }
  return hashmap
}

export default exerciseHash
