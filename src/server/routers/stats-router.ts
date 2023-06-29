import { tProtectedProcedure, trouter } from "../trpc"

const statsRouter = trouter({
  getStats: tProtectedProcedure.query(async (opts) => {
    const {
      ctx: { user },
    } = opts

    const userId = user.id
  }),
})

export default statsRouter
