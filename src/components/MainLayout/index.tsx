import React from "react"
// components
import PageGuard from "src/auth/PageGuard"
import TopNavbar from "./TopNavbar"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <PageGuard>
      <div className="flex flex-col bg-primary w-full h-screen">
        <TopNavbar />
        {children}
      </div>
    </PageGuard>
  )
}
