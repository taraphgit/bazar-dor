import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <main className="auth-page">
      <Suspense fallback={<p>Loading...</p>}>
        <AuthForm mode="signin" />
      </Suspense>
    </main>
  );
}