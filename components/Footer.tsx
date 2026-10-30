import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link href="/" className="logo" style={{ color: "white" }}>
            🛒 বাজার দর
          </Link>
          <p>
            বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার মূল্য জানুন
            <br />
            সচেতন কেনাকাটায় থাকুন এক ধাপ এগিয়ে।
          </p>
        </div>

        <p>© {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  );
}
