"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthNav() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  async function logout() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  if (isPending) return <span>...</span>;

  if (!session) return (
    <>
      <Link href="/signin" className="btn btn-outline">লগইন</Link>
      <Link href="/signup" className="btn btn-primary">রেজিস্টার</Link>
    </>
  );

  return (
    <>
      <Link href="/profile" className="btn btn-outline">👤 প্রোফাইল</Link>
      <button onClick={logout} className="btn btn-primary">লগআউট</button>
    </>
  );
}