import { TRPCError } from "@trpc/server"
import { tProtectedProcedure, trouter } from "../trpc"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"

const userRouter = trouter({
  userAttributes: tProtectedProcedure.query(async (opts) => {
    const {
      ctx: { req, res, user },
    } = opts
    if (!req || !res)
      return new TRPCError({
        message: "No req or res",
        code: "INTERNAL_SERVER_ERROR",
      })
    const supabase = createPagesServerClient({ req, res })
    try {
      const userUid = user.id
      const userAttributes = await supabase
        .from("User")
        .select("*")
        .eq("user_id", userUid)
        .single()

      if (!userAttributes.data)
        return new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        })

      return userAttributes.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error at userAttributes:", error)
      return new TRPCError({
        message: "Error fetching from user table.",
        code: "NOT_FOUND",
      })
    }
  }),
})

export default userRouter
