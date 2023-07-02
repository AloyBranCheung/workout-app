import { trouter } from "../trpc"
// procedures
import getPlans from "../procedures/workouts-procedures/get-plans"
import addExercise from "../procedures/workouts-procedures/add-exercise"
import getExercises from "../procedures/workouts-procedures/get-exercises"
import deleteExercise from "../procedures/workouts-procedures/delete-exercise"
import addWorkoutPlan from "../procedures/workouts-procedures/add-workout-plan"

const workoutsRouter = trouter({
  getPlans,
  addExercise,
  getExercises,
  deleteExercise,
  addWorkoutPlan,
})

export default workoutsRouter
