export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const API_BASE = "https://openapi.programming-hero.com/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const result = await response.json();
  return Array.isArray(result) ? result : result.data ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("ক্যাটাগরির তথ্য লোড করা যায়নি।");
  }

  const result = await response.json();
  return Array.isArray(result) ? result : result.data ?? [];
}

export function toBanglaNumber(value: number): string {
  return new Intl.NumberFormat("bn-BD").format(value);
}

export function getUnitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    litre: "লিটার",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
    packet: "প্যাকেট",
  };

  return units[unit] ?? unit;
}
