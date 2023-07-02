import { trouter } from "../trpc"
// procedures
import getPlans from "../procedures/workouts-procedures/get-plans"
import addExercise from "../procedures/workouts-procedures/add-exercise"

const workoutsRouter = trouter({
  getPlans,
  addExercise,
})

export default workoutsRouter
