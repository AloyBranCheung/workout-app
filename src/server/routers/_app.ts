import { trouter, tprocedure } from "../trpc"
// routers
import userRouter from "./user-router"
import statsRouter from "./stats-router"
import workoutsRouter from "./workouts-router"
import gymLocationRouter from "./gym-location-router"

export const appRouter = trouter({
  health: tprocedure.query(() => "healthy"),
  user: userRouter,
  stats: statsRouter,
  workouts: workoutsRouter,
  gymLocations: gymLocationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
