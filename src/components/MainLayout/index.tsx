import React, { useState } from "react"
// nextjs
import { useRouter } from "next/router"
// components
import PageGuard from "src/auth/PageGuard"
import TopNavbar from "./TopNavbar"
import Fade from "../UI/transitions/Fade"
import GutterContainer from "../UI/GutterContainer"
// supabase
import { useSupabaseClient } from "@supabase/auth-helpers-react"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleClickLogout = async () => {
    await supabase.auth.signOut()
    router.replace("/")
  }

  const handleClickBrand = () => {
    setIsMenuOpen(false)
    router.push("/home")
  }

  const handleClickPlan = () => {
    setIsMenuOpen(false)
    router.push("/workouts")
  }

  return (
    <PageGuard>
      <div className="h-full bg-background">
        <div className="flex flex-col w-full h-full">
          <TopNavbar
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            onClickPlan={handleClickPlan}
            onClickLogout={handleClickLogout}
            onClickBrand={handleClickBrand}
          />
          <div className="h-full">
            <Fade>
              <GutterContainer>
                <div className="p-5 h-full">{children}</div>
              </GutterContainer>
            </Fade>
          </div>
        </div>
      </div>
    </PageGuard>
  )
}
