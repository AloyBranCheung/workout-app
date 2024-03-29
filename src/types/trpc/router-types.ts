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

export type GetWorkoutPlansOutput = RouterOutput["workouts"]["getWorkoutPlans"]

export type GetExercisesOutput = RouterOutput["workouts"]["getExercises"]

/* -------------------------------------------------------------------------- */
/*                            Gym Locations Router                            */
/* -------------------------------------------------------------------------- */

export type CreateGymLocationOutput =
  RouterOutput["gymLocations"]["addGymLocation"]

export type GetGymLocationsOutput =
  RouterOutput["gymLocations"]["getGymLocations"]

/* -------------------------------------------------------------------------- */
/*                               Session Router                               */
/* -------------------------------------------------------------------------- */
export type GetSessionByIdOutput = RouterOutput["session"]["getSession"]
