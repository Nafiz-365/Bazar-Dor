"use client";

import { useState, useMemo, useEffect } from "react";
import type { Category, Product } from "@/lib/api";
import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type SortOption = "default" | "price-asc" | "price-desc";

interface Props {
    category: Category;
    apiFilter: string;
}

const BASE_URLS = [
    "https://api.api-store.workers.dev/api/bazardor",
    "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchWithFallback(endpoint: string): Promise<Product[]> {
    for (const base of BASE_URLS) {
        try {
            const res = await fetch(`${base}${endpoint}`);
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch {
            // try next
        }
    }
    return [];
}

export default function CategoryPageClient({ category, apiFilter }: Props) {
    const [sort, setSort] = useState<SortOption>("default");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchWithFallback(`/products?category=${encodeURIComponent(apiFilter)}`)
            .then((data) => setProducts(data))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [apiFilter]);

    const sortedProducts = useMemo(() => {
        const copy = [...products];
        if (sort === "price-asc") {
            return copy.sort((a, b) => a.today - b.today);
        }
        if (sort === "price-desc") {
            return copy.sort((a, b) => b.today - a.today);
        }
        return copy;
    }, [products, sort]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5 flex items-center gap-4">
                <span className="text-4xl">{category.icon}</span>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {category.nameBn}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {loading
                            ? "লোড হচ্ছে..."
                            : `${toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
                    </p>
                </div>
            </div>

            {/* Sort Bar */}
            <div className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between mb-5">
                <span className="text-sm text-gray-500">
                    {loading
                        ? "লোড হচ্ছে..."
                        : `মোট ${toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে`}
                </span>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">সাজান:</span>
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value as SortOption)
                            }
                            className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-700 cursor-pointer focus:outline-none focus:border-green-500"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="price-asc">দাম: কম থেকে বেশি</option>
                            <option value="price-desc">
                                দাম: বেশি থেকে কম
                            </option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Loading Skeleton */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-100 rounded-xl h-44 animate-pulse"
                        />
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && sortedProducts.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-500 mb-6">
                        এই ক্যাটাগরিতে কোনো পণ্য নেই।
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            )}

            {/* Products Grid */}
            {!loading && sortedProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
