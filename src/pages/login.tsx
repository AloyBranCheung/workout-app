import React from "react"
// nextjs
import { useRouter } from "next/router"
import { zodResolver } from "@hookform/resolvers/zod"
// hooks
import useToastMessage, { ToastMessage } from "src/hooks/useToastMessage"
// react-hook-forms
import { useForm } from "react-hook-form"
// supabase
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
// components
import Card from "src/components/UI/Card"
import FormInput from "src/components/UI/FormInput"
// types/utils/validators
import { z } from "zod"
import LoginSchema from "src/validators/login-schema"
import Button from "src/components/UI/Button"
import GutterContainer from "src/components/UI/GutterContainer"
import CopyIcon from "src/components/UI/CopyIcon"

export default function Login() {
  const router = useRouter()
  const user = useUser()
  if (user) {
    router.push("/home")
  }
  const toastMessage = useToastMessage()
  const { handleSubmit, reset, control } = useForm<z.infer<typeof LoginSchema>>(
    {
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    }
  )
  const supabase = useSupabaseClient()

  if (user) {
    router.replace("/home")
    return
  }

  const formSubmit = async (data: z.infer<typeof LoginSchema>) => {
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs
    try {
      const { error } = await supabase.auth.signInWithPassword(data)
      if (error) {
        toastMessage(error.message, ToastMessage.Error)
        return
      }
      reset()
      router.replace("/home")
    } catch (error) {
      toastMessage("Oops, something went wrong.", ToastMessage.Error)
    }
  }

  return (
    <GutterContainer>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-96 h-96 flex flex-col items-center justify-center gap-2 p-5">
          <h1 className="text-4xl font-extrabold mb-4 w-full text-center">
            SimplyWorkouts
          </h1>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-2 w-full"
          >
            <FormInput type="email" name="email" control={control} />
            <FormInput
              autoComplete="current-password"
              name="password"
              control={control}
              type="password"
            />
            <div className="flex w-full items-center justify-center">
              <Button type="submit" label="Login" />
            </div>
          </form>
          <div className="flex flex-col w-full">
            <h2 className="text-lg">Demo Account</h2>
            <CopyIcon label="user: demo@demo.com" value="demo@demo.com" />
            <CopyIcon
              label="pass: <rtP8YgSI=VSHGrdWRx)"
              value="<rtP8YgSI=VSHGrdWRx)"
            />
          </div>
        </Card>
      </div>
    </GutterContainer>
  )
}
