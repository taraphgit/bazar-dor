import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getProducts, type Product } from "@/lib/api";

const categories: Record<string, { name: string; icon: string; description: string }> = {
  chal: { name: "চাল", icon: "🍚", description: "বিভিন্ন ধরনের চালের বাজারদর দেখুন।" },
  dal: { name: "ডাল", icon: "🫘", description: "প্রতিদিনের ডালের বাজারদর জানুন।" },
  tel: { name: "তেল", icon: "🛢️", description: "রান্নার তেলের সর্বশেষ দাম দেখুন।" },
  sobji: { name: "সবজি", icon: "🥬", description: "নিত্যপ্রয়োজনীয় সবজির বাজারদর দেখুন।" },
  mach: { name: "মাছ", icon: "🐟", description: "বিভিন্ন মাছের বর্তমান বাজারদর জানুন।" },
  mangsho: { name: "মাংস", icon: "🍗", description: "মাংসের সর্বশেষ বাজারদর দেখুন।" },
  "dim-dui": { name: "ডিম ও দুধ", icon: "🥛", description: "ডিম ও দুধের বাজারদর এক জায়গায় দেখুন।" },
  mosla: { name: "মসলা", icon: "🌶️", description: "প্রয়োজনীয় মসলার বাজারদর জানুন।" },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories[slug];

  if (!category) notFound();

  let products: Product[] = [];

  try {
    const allProducts = await getProducts();
    products = allProducts.filter((product) => product.category === slug);
  } catch (error) {
    console.error("Category products loading failed:", error);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-green-700">হোম</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-800">{category.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
              {category.icon}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{category.name}</h1>
              <p className="mt-2 text-sm text-gray-500">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CategoryProducts products={products} />

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}