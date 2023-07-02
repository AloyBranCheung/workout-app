import { tProtectedProcedure } from "src/server/trpc"
import { TRPCError } from "@trpc/server"
import prisma from "src/utils/prisma"

const getUserAttributes = tProtectedProcedure.query(async (opts) => {
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
        userId: userUid,
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
})

export default getUserAttributes
