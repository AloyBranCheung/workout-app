import React from "react"
// nextjs
import { useRouter } from "next/router"
// components
import PageGuard from "src/auth/PageGuard"
import TopNavbar from "./TopNavbar"
// supabase
import { useSupabaseClient } from "@supabase/auth-helpers-react"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleClickLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/")
  }

  return (
    <PageGuard>
      <div className="flex flex-col bg-background w-full h-full min-h-screen">
        <TopNavbar onClickLogout={handleClickLogout} />
        {children}
      </div>
    </PageGuard>
  )
}
