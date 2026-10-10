"use client";

import { useEffect, useState } from "react";
import { getAllProducts, type Product } from "@/lib/api";
import { formatPrice, toBengaliNumber, translateUnit } from "@/lib/utils";

export default function PriceTicker() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getAllProducts()
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.error("Ticker fetch error:", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-100 border-b border-gray-200 py-2">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error || products.length === 0) {
        return (
            <div className="bg-gray-100 border-b border-gray-200 py-2 text-center text-xs text-gray-500">
                দাম লোড হচ্ছে...
            </div>
        );
    }

    return (
        <div className="bg-gray-100 border-b border-gray-200 overflow-hidden py-2">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...products, ...products].map((product, i) => {
                    const dir = product.change?.dir ?? "flat";
                    const pct = product.change?.pct ?? 0;
                    const colorClass =
                        dir === "up"
                            ? "text-red-500"
                            : dir === "down"
                              ? "text-green-500"
                              : "text-gray-400";
                    const icon =
                        dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

                    return (
                        <span
                            key={i}
                            className="mx-4 text-sm text-gray-700 inline-flex items-center gap-1.5"
                        >
                            <span>{product.image}</span>
                            <span className="font-medium">
                                {product.nameBn}
                            </span>
                            <span>
                                {formatPrice(product.today)} টাকা/
                                {translateUnit(product.unit)}
                            </span>
                            <span className={colorClass}>
                                {icon}{" "}
                                {toBengaliNumber(Math.abs(pct).toFixed(1))}%
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
