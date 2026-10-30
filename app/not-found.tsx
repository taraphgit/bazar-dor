import Link from "next/link";

export default function NotFound() {
  return (
    <main className="profile-page">
      <section className="profile-card not-found-card">
        <h1>৪০৪</h1>
        <h2>পেজটি পাওয়া যায়নি</h2>
        <p>ঠিকানাটি পরীক্ষা করে আবার চেষ্টা করো।</p>
        <Link href="/" className="profile-edit-button">হোম পেজে ফিরে যাও</Link>
      </section>
    </main>
  );
}