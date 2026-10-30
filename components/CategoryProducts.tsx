"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/api";

type Props = {
  products: Product[];
};

export default function CategoryProducts({ products }: Props) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortBy === "low-to-high") {
      items.sort((a, b) => a.today - b.today);
    } else if (sortBy === "high-to-low") {
      items.sort((a, b) => b.today - a.today);
    }

    return items;
  }, [products, sortBy]);

  return (
    <section>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            এই ক্যাটাগরির সব পণ্য
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            মোট {products.length}টি পণ্য পাওয়া গেছে
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="product-sort" className="whitespace-nowrap text-sm font-medium text-gray-600">
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <div className="mb-3 text-5xl">🛒</div>
          <h3 className="text-lg font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>
        </div>
      )}
    </section>
  );
}