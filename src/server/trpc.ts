import { TRPCError, initTRPC } from "@trpc/server"
import { Context } from "src/utils/trpc"

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create()
// Base router and procedure helpers
export const trouter = t.router
export const tprocedure = t.procedure

// auth middleware
const tmiddleware = t.middleware
const isAuthed = tmiddleware((opts) => {
  const { ctx }: { ctx: Context } = opts

  if (ctx instanceof TRPCError) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "createContextFn Error",
      cause: ctx,
    })
  }

  const { user, req, res } = ctx

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return opts.next({
    ctx: {
      user,
      req,
      res,
    },
  })
})

export const tProtectedProcedure = tprocedure.use(isAuthed)
