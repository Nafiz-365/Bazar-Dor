import Link from "next/link";
import type { Product } from "@/lib/api";
import {
    toBengaliNumber,
    formatPrice,
    getChangeColor,
    getChangeIcon,
    translateUnit,
} from "@/lib/utils";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const dir = product.change?.dir ?? "flat";
    const pct = product.change?.pct ?? 0;

    return (
        <Link
            href={`/product/${product.id}`}
            className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-green-100 transition-shadow duration-200 block"
        >
            {/* Emoji + Change badge */}
            <div className="flex items-start justify-between">
                <div className="text-4xl">{product.image}</div>
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-50 ${getChangeColor(
                        dir,
                    )}`}
                >
                    {getChangeIcon(dir)}{" "}
                    {toBengaliNumber(Math.abs(pct).toFixed(1))}%
                </span>
            </div>

            {/* Name + Unit */}
            <h3 className="font-semibold text-gray-800 mt-3 leading-tight">
                {product.nameBn}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
                প্রতি {translateUnit(product.unit)}
            </p>

            {/* Price */}
            <div className="mt-3">
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <p className="text-xl font-bold text-gray-800">
                    {formatPrice(product.today)}{" "}
                    <span className="text-sm font-normal text-gray-500">
                        টাকা
                    </span>
                </p>
            </div>
        </Link>
    );
}
