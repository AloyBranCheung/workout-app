import { TRPCError } from "@trpc/server"
import { tProtectedProcedure, trouter } from "../trpc"
import prisma from "src/utils/prisma"

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
    try {
      const userUid = user.id
      const userAttributes = await prisma.user.findUnique({
        where: {
          user_id: userUid,
        },
      })

      if (!userAttributes)
        return new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        })

      return userAttributes
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error at userAttributes:", error)
      return new TRPCError({
        message: "Error fetching from user table.",
        code: "NOT_FOUND",
        cause: error,
      })
    }
  }),
})

export default userRouter
