import React from "react"
// components
import MainLayout from "src/components/MainLayout"

export default function SummaryPage() {
  return <div>summary</div>
}

SummaryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
