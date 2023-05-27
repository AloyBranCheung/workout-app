import React from "react";
// nextjs
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
// react-hook-forms
import { useForm } from "react-hook-form";
// supabase
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
// components
import Card from "src/components/UI/Card";
import FormInput from "src/components/UI/FormInput";
// types/utils/validators
import { z } from "zod";
import LoginSchema from "src/validators/loginSchema";
import Button from "src/components/UI/Button";

export default function Login() {
  const router = useRouter();
  const { handleSubmit, reset, control } = useForm<z.infer<typeof LoginSchema>>(
    {
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    }
  );
  const supabase = useSupabaseClient();
  const user = useUser();

  // TODO: if user router.redirect to protected pages

  // TODO: Sign In Form
  const formSubmit = async (data: z.infer<typeof LoginSchema>) => {
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs
    console.log("clicked");
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <form onSubmit={handleSubmit(formSubmit)}>
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
      </Card>
    </div>
  );
}
