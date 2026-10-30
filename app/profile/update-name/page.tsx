"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateNamePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম লিখো");

    setLoading(true);
    try {
      const result = await authClient.updateUser({ name: name.trim() });
      if (result.error) {
        toast.error(result.error.message || "Update হয়নি");
        return;
      }
      toast.success("নাম পরিবর্তন হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) return <main className="profile-page">Loading...</main>;

  if (!session) {
    return <main className="profile-page"><Link href="/signin">Sign In</Link></main>;
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        <h1>নাম পরিবর্তন</h1>
        <form onSubmit={submit} className="auth-form">
          <label>নতুন নাম
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <button className="auth-submit" disabled={loading}>
            {loading ? "Updating..." : "Update Name"}
          </button>
        </form>
        <Link href="/profile" className="profile-home-link">ফিরে যাও</Link>
      </section>
    </main>
  );
}