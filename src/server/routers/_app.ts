import { trouter } from "../trpc"
// routers
import helloWorldRouter from "./hello-world"

export const appRouter = trouter({
  helloWorld: helloWorldRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
