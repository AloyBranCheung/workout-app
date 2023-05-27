/* eslint-disable no-console */
// script while sign-up is disabled
import prompt from "prompt-sync"
import { createClient } from "@supabase/supabase-js"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const validationSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
})

const prompter = prompt()
const prisma = new PrismaClient()

const getUuid = async () => {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const promptRes = {
      name: prompter("What is your name?"),
      email: prompter("What is your email?"),
      password: prompter("Set a password (at least 6 characters):"),
    }
    await validationSchema.parse(promptRes)

    const userObj = await supabase.auth.signUp({
      email: promptRes.email,
      password: promptRes.password,
    })
    const uuid = userObj?.data?.user?.id

    await supabase.removeAllChannels()

    const details = {
      user_id: uuid,
      email: promptRes.email,
      name: promptRes.name,
    }
    return details
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  const details = await getUuid()
  try {
    if (!details?.email || !details?.user_id || !details?.name) return
    await prisma.user.create({
      data: {
        user_id: details?.user_id,
        email: details?.email,
        name: details?.name,
      },
    })
    await prisma.$disconnect()
    console.log(
      `Successfully created user ${details?.name} :) Have a good one!`
    )
  } catch (error) {
    console.error(error)
  }
}

main()
