import { trouter } from "../trpc"
// procedures
import getPlans from "../procedures/workouts-procedures/get-plans"
import addExercise from "../procedures/workouts-procedures/add-exercise"
import getExercises from "../procedures/workouts-procedures/get-exercises"

const workoutsRouter = trouter({
  getPlans,
  addExercise,
  getExercises,
})

export default workoutsRouter
