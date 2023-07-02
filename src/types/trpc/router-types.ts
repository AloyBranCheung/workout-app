import { RouterOutput } from "."

/* -------------------------------------------------------------------------- */
/*                                 User Router                                */
/* -------------------------------------------------------------------------- */
export type UserAttributesOutput = RouterOutput["user"]["userAttributes"]

/* -------------------------------------------------------------------------- */
/*                                Stats Router                                */
/* -------------------------------------------------------------------------- */
export type StatsOutput = RouterOutput["stats"]["getStats"]

/* -------------------------------------------------------------------------- */
/*                               Workouts Router                              */
/* -------------------------------------------------------------------------- */

export type WorkoutGetPlansOutput = RouterOutput["workouts"]["getPlans"]

export type GetExercisesOutput = RouterOutput["workouts"]["getExercises"]
