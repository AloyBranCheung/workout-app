import { trouter, tprocedure } from "../trpc"
// routers
import helloWorldRouter from "./hello-world"

export const appRouter = trouter({
  health: tprocedure.query(() => ({
    data: "Healthy",
  })),
  helloWorld: helloWorldRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
