import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "src/server/routers/_app"

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
