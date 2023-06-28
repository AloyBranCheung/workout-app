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

  const handleClickBrand = () => {
    router.push("/home")
  }

  return (
    <PageGuard>
      <div className="h-screen bg-background overflow-auto">
        <div className="flex flex-col w-full h-full">
          <TopNavbar
            onClickLogout={handleClickLogout}
            onClickBrand={handleClickBrand}
          />
          {children}
        </div>
      </div>
    </PageGuard>
  )
}
