import { tProtectedProcedure } from "src/server/trpc"
import { TRPCError } from "@trpc/server"
import prisma from "src/utils/prisma"

const getUserAttributes = tProtectedProcedure.query(async (opts) => {
  const {
    ctx: { user },
  } = opts

  try {
    const userUid = user.id
    const userAttributes = await prisma.user.findUnique({
      where: {
        userId: userUid,
      },
      include: {
        profile: true,
      },
    })

    if (!userAttributes)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found.",
      })

    return userAttributes
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error at userAttributes:", error)
    throw new TRPCError({
      message: "Error fetching from user table.",
      code: "NOT_FOUND",
      cause: error,
    })
  }
})

export default getUserAttributes
