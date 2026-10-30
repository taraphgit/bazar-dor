"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";

export default function PriceTicker() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  if (!products.length) return null;

  const items = [...products, ...products];

  return (
    <div className="price-ticker">
      <div className="ticker-label">আজকের বাজার দর</div>
      <div className="ticker-window">
        <div className="price-ticker-track">
          {items.map((product, index) => (
            <span key={`${product.id}-${index}`}>
              {product.nameBn}: ৳{product.today}
              <strong className={product.change?.dir === "up" ? "ticker-up" : "ticker-down"}>
                {product.change?.dir === "up" ? " ▲ " : " ▼ "}
                {product.change?.pct}%
              </strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}