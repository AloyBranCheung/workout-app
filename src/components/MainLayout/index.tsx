import React, { useState } from "react"
// nextjs
import { useRouter } from "next/router"
// hooks
import useCurrActiveSesh from "src/hooks/useCurrActiveSesh"
// supabase
import { useSupabaseClient } from "@supabase/auth-helpers-react"
// components
import PageGuard from "src/auth/PageGuard"
import TopNavbar from "./TopNavbar"
import Fade from "../UI/transitions/Fade"
import GutterContainer from "../UI/GutterContainer"
import PrimaryButton from "../UI/PrimaryButton"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { isNotifyActiveWorkout } = useCurrActiveSesh()

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

  const handleClickExercises = () => {
    setIsMenuOpen(false)
    router.push("/exercises")
  }
  const handleClickRuns = () => {
    setIsMenuOpen(false)
    router.push("/running")
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
            onClickExercises={handleClickExercises}
            onClickRuns={handleClickRuns}
            onClickGymLocation={() => {
              setIsMenuOpen(false)
              router.push("/gym-locations")
            }}
          />
          <div className="min-h-screen relative">
            <Fade>
              <GutterContainer>
                <div className="p-5 h-full">{children}</div>
              </GutterContainer>
            </Fade>
            {isNotifyActiveWorkout && (
              <PrimaryButton
                onClick={() => router.push("/workouts/curr-active-workout")}
                type="button"
                label="Continue Workout?"
                className="fixed bottom-0 left-0 w-full rounded-t-2xl rounded-b-none py-6 flex items-center justify-center gap-2"
              />
            )}
          </div>
        </div>
      </div>
    </PageGuard>
  )
}
