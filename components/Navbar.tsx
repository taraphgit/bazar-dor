"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthNav from "@/components/AuthNav";

const categories = [
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
  { name: "ডিম-দুধ", slug: "dim-dui" },
  { name: "মসলা", slug: "mosla" },
];

export default function Navbar() {
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    setBanglaDate(new Intl.DateTimeFormat("bn-BD", {
      day: "numeric", month: "long", year: "numeric"
    }).format(new Date()));
  }, []);

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <Link href="/" className="logo">
            🛒 বাজার দর
            <small>আজকের বাজার, আপনার হাতেই</small>
          </Link>
          <nav className="nav-links">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </nav>
          <div className="nav-actions"><AuthNav /></div>
        </div>
      </header>
      <div className="ticker">
        <div className="container ticker-track">
          <span>📅 {banglaDate || "আজকের তারিখ"}</span>
          <span>🇧🇩 বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর</span>
          <span>📊 নিয়মিত মূল্য আপডেট</span>
        </div>
      </div>
    </>
  );
}