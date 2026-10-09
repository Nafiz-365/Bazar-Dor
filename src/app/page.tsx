import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
    const products = await getAllProducts();

    // Top 6 risers — dir === 'up', পজিটিভ pct, সবচেয়ে বেশি আগে
    const risers = products
        .filter((p) => p.change?.dir === "up" && (p.change?.pct ?? 0) > 0)
        .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
        .slice(0, 6);

    // Top 6 fallers — dir === 'down', নেগেটিভ pct, সবচেয়ে কম আগে
    const fallers = products
        .filter((p) => p.change?.dir === "down" && (p.change?.pct ?? 0) < 0)
        .sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0))
        .slice(0, 6);

    return (
        <div className="max-w-6xl mx-auto px-4">
            {/* Hero */}
            <Hero />

            {/* Section A: Risers */}
            <section className="mt-12">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
                    <span className="text-red-500">▲</span>
                    <span>আজ দাম বেড়েছে</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {risers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Section B: Fallers */}
            <section className="mt-12">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
                    <span className="text-green-500">▼</span>
                    <span>আজ দাম কমেছে</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fallers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Section C: All products */}
            <section id="সব-পণ্য" className="mt-14 mb-16 scroll-mt-32">
                <h2 className="text-xl font-bold mb-2">সব পণ্য</h2>
                <p className="text-sm text-gray-500 mb-5">
                    মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}
