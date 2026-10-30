import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের বাজার মূল্য",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের প্রতিদিনের বাজার দর জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
