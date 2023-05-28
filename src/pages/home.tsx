import React, { ReactElement } from "react";
import Button from "src/components/UI/Button";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import MainLayout from "src/components/MainLayout";

export default function Home() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  return (
    <div>
      <div>user: {user?.email}</div>
      <Button
        type="button"
        label="logout"
        onClick={async () => {
          await supabase.auth.signOut();
          router.replace("/");
        }}
      />
      {!user && (
        <Button
          type="button"
          label="go to login"
          onClick={() => router.push("/login")}
        />
      )}
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};