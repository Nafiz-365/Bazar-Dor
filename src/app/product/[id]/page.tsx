import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getSingleProduct } from "@/lib/api";
import {
    formatPrice,
    translateUnit,
    getChangeColor,
    getChangeIcon,
    toBengaliNumber,
} from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Auth check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/signin?redirected=true");

    // Fetch product
    const { id } = await params;
    const product = await getSingleProduct(id).catch(() => null);
    if (!product) notFound();

    const markets = product.markets || [];

    // Price summary from markets
    const minPrice =
        markets.length > 0
            ? Math.min(...markets.map((m) => m.min))
            : product.today;
    const maxPrice =
        markets.length > 0
            ? Math.max(...markets.map((m) => m.max))
            : product.today;
    const avgPrice =
        markets.length > 0
            ? Math.round(
                  markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
                      markets.length,
              )
            : product.today;

    const dir = product.change?.dir ?? "flat";
    const pct = product.change?.pct ?? 0;

    // Price history — all 4 data points from API
    const history = [
        { label: "আজ", price: product.today, highlight: true },
        { label: "গতকাল", price: product.yesterday, highlight: false },
        { label: "গত সপ্তাহ", price: product.lastWeek, highlight: false },
        { label: "গত মাস", price: product.lastMonth, highlight: false },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4 flex items-center gap-1.5 flex-wrap">
                <Link href="/" className="hover:text-green-600">
                    হোম
                </Link>
                <span>›</span>
                {/* product.category is the API slug (sobji, dim-dui, mosla etc.) */}
                <Link
                    href={`/category/${product.category}`}
                    className="hover:text-green-600"
                >
                    {product.categoryNameBn}
                </Link>
                <span>›</span>
                <span className="text-gray-800">{product.nameBn}</span>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="text-6xl">{product.image}</div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            {product.nameBn}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            প্রতি {translateUnit(product.unit)} ·{" "}
                            {product.categoryNameBn}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            গতকালের তুলনায় আজ দাম{" "}
                            <span className={getChangeColor(dir)}>
                                {dir === "up"
                                    ? "বেড়েছে"
                                    : dir === "down"
                                      ? "কমেছে"
                                      : "অপরিবর্তিত"}{" "}
                                · {toBengaliNumber(Math.abs(pct).toFixed(1))}%{" "}
                                {getChangeIcon(dir)}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-center min-w-[160px] w-full md:w-auto">
                    <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {formatPrice(product.today)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        টাকা / {translateUnit(product.unit)}
                    </p>
                    <p className={`text-sm font-medium mt-2 ${getChangeColor(dir)}`}>
                        {getChangeIcon(dir)}{" "}
                        {toBengaliNumber(Math.abs(pct).toFixed(1))}%
                    </p>
                </div>
            </div>

            {/* Price History */}
            <h2 className="text-xl font-bold mt-10 mb-4">দামের ইতিহাস</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {history.map(({ label, price, highlight }) => (
                    <div
                        key={label}
                        className={`rounded-xl border p-4 text-center ${
                            highlight
                                ? "border-green-200 bg-green-50"
                                : "border-gray-100 bg-white"
                        }`}
                    >
                        <p className="text-xs text-gray-500 mb-1">{label}</p>
                        <p className={`text-xl font-bold ${highlight ? "text-green-700" : "text-gray-800"}`}>
                            {formatPrice(price)}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            টাকা/{translateUnit(product.unit)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Price Summary */}
            <h2 className="text-xl font-bold mt-10 mb-4">দামের সারসংক্ষেপ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                    <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        {formatPrice(minPrice)} টাকা
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        সবচেয়ে কম দামের বাজার
                    </p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                    <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
                    <p className="text-2xl font-bold text-red-500 mt-1">
                        {formatPrice(maxPrice)} টাকা
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        সবচেয়ে বেশি দামের বাজার
                    </p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                    <p className="text-sm text-gray-500">গড় দাম</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                        {formatPrice(avgPrice)} টাকা
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        প্রতি {translateUnit(product.unit)}-এর হিসাব
                    </p>
                </div>
            </div>

            {/* Market Table */}
            <h2 className="text-xl font-bold mt-10 mb-4">
                বাজারভিত্তিক আজকের দাম
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-10">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-3 font-medium text-gray-600">বাজার</th>
                                <th className="text-left p-3 font-medium text-gray-600">বিভাগ</th>
                                <th className="text-right p-3 font-medium text-gray-600">সর্বনিম্ন</th>
                                <th className="text-right p-3 font-medium text-gray-600">সর্বোচ্চ</th>
                                <th className="text-right p-3 font-medium text-gray-600">গড়</th>
                            </tr>
                        </thead>
                        <tbody>
                            {markets.map((market, i) => {
                                const avg = Math.round((market.min + market.max) / 2);
                                return (
                                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                                        <td className="p-3 text-gray-800">{market.market}</td>
                                        <td className="p-3 text-gray-500">{market.division}</td>
                                        <td className="p-3 text-right text-green-600">
                                            {formatPrice(market.min)} টাকা
                                        </td>
                                        <td className="p-3 text-right text-red-500">
                                            {formatPrice(market.max)} টাকা
                                        </td>
                                        <td className="p-3 text-right font-medium text-gray-800">
                                            {formatPrice(avg)} টাকা
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
