import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Home() {
  let products = [];

  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">🇧🇩 বাংলাদেশের বাজারের আপডেট</span>
            <h1>
              প্রতিদিনের <span>বাজার দর,</span> এখন আপনার হাতেই
            </h1>
            <p className="hero-description">
              চাল, ডাল, তেল, মাছ, মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ
              মূল্য জানুন। বাজারে যাওয়ার আগে জেনে নিন আজকের দাম।
            </p>
            <Link href="#সব-পণ্য" className="btn btn-primary">
              সব পণ্যের দাম দেখুন →
            </Link>
          </div>

          <div className="hero-visual">
            <div className="hero-emoji">
              <span>🥬</span>
              <span>🍅</span>
              <span>🍚</span>
              <span>🐟</span>
              <span>🥚</span>
              <span>🥕</span>
            </div>
          </div>
        </div>
      </section>

      {products.length === 0 ? (
        <section className="section container">
          <div className="empty-state">
            পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
          </div>
        </section>
      ) : (
        <>
          <section className="section container">
            <div className="section-heading">
              <div>
                <h2>📈 যে পণ্যের দাম বেড়েছে</h2>
                <p>গতকালের তুলনায় যেসব পণ্যের দাম বৃদ্ধি পেয়েছে</p>
              </div>
            </div>

            {risers.length ? (
              <div className="product-grid">
                {risers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">দাম বৃদ্ধির কোনো তথ্য নেই।</div>
            )}
          </section>

          <section className="section container">
            <div className="section-heading">
              <div>
                <h2>📉 যে পণ্যের দাম কমেছে</h2>
                <p>গতকালের তুলনায় যেসব পণ্যের দাম কমেছে</p>
              </div>
            </div>

            {fallers.length ? (
              <div className="product-grid">
                {fallers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">দাম কমার কোনো তথ্য নেই।</div>
            )}
          </section>

          <section className="section container" id="সব-পণ্য">
            <div className="section-heading">
              <div>
                <h2>🛍️ সব পণ্যের বাজার দর</h2>
                <p>আজকের সব নিত্যপ্রয়োজনীয় পণ্যের মূল্য তালিকা</p>
              </div>
              <span>{products.length}টি পণ্য</span>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
