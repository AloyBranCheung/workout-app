/* eslint-disable no-console */
import prompt from "prompt-sync"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prompter = prompt()
const prisma = new PrismaClient()
const validationSchema = z.string().uuid()

const main = async () => {
  const uuid = prompter("What is the user's uuid?")
  const confirmation = prompter("Are you sure? 'y/n'")
  if (confirmation !== "y") {
    console.log("Successfully aborted.")
    return
  }
  const validatedUuid = await validationSchema.parse(uuid)
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        user_id: validatedUuid,
      },
    })
    await prisma.$disconnect()
    console.log(`Successfully deleted ${deletedUser.name}.`)
  } catch (error) {
    console.error(error)
  }
}

main()
