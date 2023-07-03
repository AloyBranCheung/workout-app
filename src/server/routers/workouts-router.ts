import { trouter } from "../trpc"
// procedures
import addExercise from "../procedures/workouts-procedures/add-exercise"
import getExercises from "../procedures/workouts-procedures/get-exercises"
import updateExercise from "../procedures/workouts-procedures/update-exercise"
import deleteExercise from "../procedures/workouts-procedures/delete-exercise"
import addWorkoutPlan from "../procedures/workouts-procedures/add-workout-plan"
import getWorkoutPlans from "../procedures/workouts-procedures/get-workout-plans"
import updateWorkoutPlan from "../procedures/workouts-procedures/update-workout-plan"
import deleteWorkout from "../procedures/workouts-procedures/delete-workout"

const workoutsRouter = trouter({
  addExercise,
  getExercises,
  updateExercise,
  deleteExercise,
  addWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkout,
})

export default workoutsRouter
