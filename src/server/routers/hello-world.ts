import { z } from "zod"
import { tprocedure, trouter } from "../trpc"

const helloWorldRouter = trouter({
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

export default helloWorldRouter
