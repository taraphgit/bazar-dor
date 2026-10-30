import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, getUnitLabel, toBanglaNumber } from "@/lib/api";

export const instant = false;

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let products = [];

  try {
    products = await getProducts();
  } catch {
    notFound();
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const minimumPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const maximumPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0
        ) / markets.length
      )
    : product.today;

  return (
    <div className="container product-details-page">
      <div className="details-breadcrumb">
        <Link href="/">হোম</Link>
        <span> / </span>
        <Link href={`/category/${product.category}`}>
          {product.categoryNameBn}
        </Link>
        <span> / </span>
        <span>{product.nameBn}</span>
      </div>

      <section className="details-main">
        <div className="details-product-visual">
          <span>{product.image || product.categoryIcon}</span>
        </div>

        <div className="details-product-info">
          <span className="details-category">
            {product.categoryIcon} {product.categoryNameBn}
          </span>

          <h1>{product.nameBn}</h1>

          <p className="details-unit">
            প্রতি {getUnitLabel(product.unit)}
          </p>

          <div className="details-current-price">
            ৳{toBanglaNumber(product.today)}
            <small> / {getUnitLabel(product.unit)}</small>
          </div>

          <p className="details-comparison">
            গতকালের দাম: ৳{toBanglaNumber(product.yesterday)}
          </p>

          <div className="details-change">
            {product.change.dir === "up"
              ? "↑ দাম বেড়েছে"
              : product.change.dir === "down"
                ? "↓ দাম কমেছে"
                : "− দাম অপরিবর্তিত"}
            {" "}
            {toBanglaNumber(Math.abs(product.change.pct))}%
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="section-heading">
          <div>
            <h2>দামের সারসংক্ষেপ</h2>
            <p>বিভিন্ন বাজারের দামের ভিত্তিতে হিসাব করা হয়েছে</p>
          </div>
        </div>

        <div className="price-summary-grid">
          <div className="price-summary-card">
            <span>সর্বনিম্ন দাম</span>
            <strong>৳{toBanglaNumber(minimumPrice)}</strong>
          </div>

          <div className="price-summary-card">
            <span>সর্বোচ্চ দাম</span>
            <strong>৳{toBanglaNumber(maximumPrice)}</strong>
          </div>

          <div className="price-summary-card">
            <span>গড় দাম</span>
            <strong>৳{toBanglaNumber(averagePrice)}</strong>
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="section-heading">
          <div>
            <h2>দামের ইতিহাস</h2>
            <p>আগের সময়ের সঙ্গে বর্তমান দামের তুলনা</p>
          </div>
        </div>

        <div className="history-grid">
          <div className="history-card">
            <span>আজকের দাম</span>
            <strong>৳{toBanglaNumber(product.today)}</strong>
          </div>

          <div className="history-card">
            <span>গতকালের দাম</span>
            <strong>৳{toBanglaNumber(product.yesterday)}</strong>
          </div>

          <div className="history-card">
            <span>গত সপ্তাহের দাম</span>
            <strong>৳{toBanglaNumber(product.lastWeek)}</strong>
          </div>

          <div className="history-card">
            <span>গত মাসের দাম</span>
            <strong>৳{toBanglaNumber(product.lastMonth)}</strong>
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="section-heading">
          <div>
            <h2>বাজারভিত্তিক দাম</h2>
            <p>বিভিন্ন বাজারে এই পণ্যের দামের তুলনা</p>
          </div>
        </div>

        {markets.length > 0 ? (
          <div className="market-table-wrapper">
            <table className="market-table">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন দাম</th>
                  <th>সর্বোচ্চ দাম</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr key={`${market.market}-${index}`}>
                    <td>{market.market}</td>
                    <td>{market.division}</td>
                    <td>৳{toBanglaNumber(market.min)}</td>
                    <td>৳{toBanglaNumber(market.max)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </div>
        )}
      </section>

      <div className="details-back">
        <Link href="/" className="btn btn-primary">
          ← সব পণ্যে ফিরে যান
        </Link>
      </div>
    </div>
  );
}