import { z } from "zod"
import { tprocedure, trouter } from "../trpc"

export const appRouter = trouter({
  hello: tprocedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
