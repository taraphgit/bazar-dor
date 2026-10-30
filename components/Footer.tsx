"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h3>🛒 বাজার দর</h3>
            <p>বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন এক জায়গায়।</p>
          </div>
        </div>

        <p>© {year || "২০২৬"} বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
}