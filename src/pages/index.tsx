import { useRouter } from "next/router"
import Button from "src/components/UI/Button"
export default function Welcome() {
  const router = useRouter()
  // TODO: if user top navbar will show 'Dashboard and Logout' button instead of
  // TODO: 'Login' button

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>Landing Page</div>
      <Button
        onClick={() => router.push("/login")}
        type="button"
        label="go to login"
      />
    </div>
  )
}
