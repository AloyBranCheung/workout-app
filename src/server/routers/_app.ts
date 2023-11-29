import { trouter, tprocedure } from "../trpc"
// routers
import userRouter from "./user-router"
import statsRouter from "./stats-router"
import workoutsRouter from "./workouts-router"
import gymLocationRouter from "./gym-location-router"
import currActiveSeshRouter from "./curr-active-sesh-router"
import sessionRouter from "./session-router"
import setsRouter from "./sets-router"
import activityRouter from "./activity-router"

export const appRouter = trouter({
  health: tprocedure.query(() => "healthy"),
  user: userRouter,
  stats: statsRouter,
  workouts: workoutsRouter,
  gymLocations: gymLocationRouter,
  currActiveSesh: currActiveSeshRouter,
  session: sessionRouter,
  sets: setsRouter,
  activity: activityRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
