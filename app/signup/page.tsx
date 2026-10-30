import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
  return (
    <main className="auth-page">
      <Suspense fallback={<p>Loading...</p>}>
        <AuthForm mode="signup" />
      </Suspense>
    </main>
  );
}