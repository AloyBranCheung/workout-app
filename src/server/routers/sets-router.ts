import { trouter } from "../trpc"
// procedures
import getSetsByExerciseId from "../procedures/sets/get-sets-by-exercise-id"

const setsRouter = trouter({ getSetsByExerciseId })

export default setsRouter
