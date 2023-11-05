import { ReactElement } from "react"
import MainLayout from "src/components/MainLayout"

export default function RunningPage() {
  return <div>RunningPage</div>
}

RunningPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}
