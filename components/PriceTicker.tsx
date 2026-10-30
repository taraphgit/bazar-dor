"use client";

import { useEffect, useState } from "react";
import { getProducts, type Product } from "@/lib/api";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch(() => {
        if (active) setProducts([]);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!products.length) return null;

  const items = [...products, ...products];

  return (
    <div className="price-ticker" aria-label="আজকের বাজার দর">
      <div className="ticker-label">আজকের বাজার দর</div>

      <div className="ticker-window">
        <div className="price-ticker-track">
          {items.map((product, index) => {
            const direction = product.change?.dir;
            const isUp = direction === "up";
            const isFlat = direction === "flat";

            return (
              <span key={`${product.id}-${index}`}>
                {product.nameBn}: ৳{product.today}
                <strong
                  className={
                    isFlat
                      ? "ticker-flat"
                      : isUp
                        ? "ticker-up"
                        : "ticker-down"
                  }
                >
                  {isFlat ? " — " : isUp ? " ▲ " : " ▼ "}
                  {Math.abs(product.change?.pct ?? 0)}%
                </strong>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}