import { useRouter } from "next/router";
import Button from "src/components/UI/Button";
export default function Welcome() {
  const router = useRouter();
  // TODO: if user top navbar will show 'Dashboard and Logout' button instead of
  // TODO: 'Login' button

  return (
    <div>
      <Button
        onClick={() => router.push("/login")}
        type="button"
        label="go to login"
      />
    </div>
  );
}
