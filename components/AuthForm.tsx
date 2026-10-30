"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type Props = {
  mode: "signin" | "signup";
};

export default function AuthForm({ mode }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/";
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const result = await authClient.signUp.email({
          name,
          email,
          password,
        });

        if (result.error) {
          toast.error(result.error.message || "Account তৈরি করা যায়নি");
          return;
        }
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        });

        if (result.error) {
          toast.error(result.error.message || "Login করা যায়নি");
          return;
        }
      }

      toast.success(isSignup ? "Account তৈরি হয়েছে!" : "Login successful!");
      router.push(callbackURL);
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  async function socialLogin(provider: "google" | "github") {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL,
      });
    } catch {
      toast.error(`${provider} login করা যায়নি`);
    }
  }

  return (
    <div className="auth-card">
      <Link href="/" className="auth-logo">🛒 বাজার দর</Link>

      <h1>{isSignup ? "নতুন Account তৈরি করো" : "স্বাগতম!"}</h1>
      <p className="auth-subtitle">
        {isSignup
          ? "বাজারদর জানতে একটি account তৈরি করো"
          : "তোমার account-এ Login করো"}
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        {isSignup && (
          <label>
            তোমার নাম
            <input
              type="text"
              placeholder="নাম লিখো"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        )}

        <label>
          Email Address
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </label>

        <button type="submit" disabled={loading} className="auth-submit">
          {loading
            ? "অপেক্ষা করো..."
            : isSignup
              ? "Sign Up"
              : "Sign In"}
        </button>
      </form>

      <div className="auth-divider"><span>অথবা</span></div>

      <button
        type="button"
        className="social-button"
        onClick={() => socialLogin("google")}
      >
        Continue with Google
      </button>

      <button
        type="button"
        className="social-button"
        onClick={() => socialLogin("github")}
      >
        Continue with GitHub
      </button>

      <p className="auth-switch">
        {isSignup ? "আগে থেকেই account আছে?" : "Account নেই?"}{" "}
        <Link href={isSignup ? "/signin" : "/signup"}>
          {isSignup ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
}