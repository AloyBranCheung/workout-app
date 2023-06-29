import { trouter, tprocedure } from "../trpc"
// routers
import userRouter from "./user-router"
import statsRouter from "./stats-router"

export const appRouter = trouter({
  health: tprocedure.query(() => ({
    data: "Healthy",
  })),
  user: userRouter,
  stats: statsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
