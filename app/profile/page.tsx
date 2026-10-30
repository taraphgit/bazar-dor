import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/signin?callbackURL=/profile");

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-avatar">👤</div>
        <h1>আমার প্রোফাইল</h1>
        <div className="profile-info">
          <div><span>নাম</span><strong>{session.user.name}</strong></div>
          <div><span>Email</span><strong>{session.user.email}</strong></div>
        </div>
        <Link href="/profile/update-name" className="profile-edit-button">নাম পরিবর্তন</Link>
        <Link href="/" className="profile-home-link">হোম পেজ</Link>
      </section>
    </main>
  );
}