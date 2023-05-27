import React from "react";
// nextjs
import { useRouter } from "next/router";
// supabase
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
// components
import Card from "src/components/UI/Card";

export default function Login() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  // TODO: if user router.redirect to protected pages

  // TODO: Sign In Form
  const handleSignIn = async () => {
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs
  };

  return <Card>login</Card>;
}
