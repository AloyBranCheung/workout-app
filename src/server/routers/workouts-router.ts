import { trouter } from "../trpc"
// procedures
import addExercise from "../procedures/workouts-procedures/add-exercise"
import getExercises from "../procedures/workouts-procedures/get-exercises"
import deleteExercise from "../procedures/workouts-procedures/delete-exercise"
import addWorkoutPlan from "../procedures/workouts-procedures/add-workout-plan"
import getWorkoutPlans from "../procedures/workouts-procedures/get-workout-plans"

const workoutsRouter = trouter({
  addExercise,
  getExercises,
  deleteExercise,
  addWorkoutPlan,
  getWorkoutPlans,
})

export default workoutsRouter
