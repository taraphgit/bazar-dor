import Link from "next/link";
import type { Product } from "@/lib/api";
import { getUnitLabel, toBanglaNumber } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  const changeClass =
    product.change.dir === "up"
      ? "change-up"
      : product.change.dir === "down"
        ? "change-down"
        : "change-flat";

  const changeSymbol =
    product.change.dir === "up"
      ? "↑"
      : product.change.dir === "down"
        ? "↓"
        : "−";

  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      <div className="product-top">
        <div className="product-emoji">{product.image || product.categoryIcon}</div>
        <span className={`change-badge ${changeClass}`}>
          {changeSymbol} {toBanglaNumber(Math.abs(product.change.pct))}%
        </span>
      </div>

      <h3>{product.nameBn}</h3>
      <div className="product-category">
        {product.categoryIcon} {product.categoryNameBn}
      </div>

      <div className="product-price">
        ৳{toBanglaNumber(product.today)}
        <small> / {getUnitLabel(product.unit)}</small>
      </div>

      <div className="product-history">
        গতকাল: ৳{toBanglaNumber(product.yesterday)}
      </div>
    </Link>
  );
}
