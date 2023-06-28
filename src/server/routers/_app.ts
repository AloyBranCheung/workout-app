import { trouter, tprocedure } from "../trpc"
// routers
import userRouter from "./user-router"

export const appRouter = trouter({
  health: tprocedure.query(() => ({
    data: "Healthy",
  })),
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
