import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/api";
import CategoryPageClient from "@/components/CategoryPageClient";

const CATEGORY_INFO: Record<string, { nameBn: string; icon: string }> = {
    chal: { nameBn: "চাল", icon: "🍚" },
    dal: { nameBn: "ডাল", icon: "🫘" },
    tel: { nameBn: "তেল", icon: "🛢️" },
    sobji: { nameBn: "সবজি", icon: "🥬" },
    mach: { nameBn: "মাছ", icon: "🐟" },
    mangsho: { nameBn: "মাংস", icon: "🍗" },
    "dim-dui": { nameBn: "ডিম-দুধ", icon: "🥛" },
    mosla: { nameBn: "মসলা", icon: "🌶️" },
};

export const revalidate = 3600;

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Invalid slug? → 404
    const catInfo = CATEGORY_INFO[slug];
    if (!catInfo) notFound();

    const products = await getProductsByCategory(slug).catch(() => []);

    const category = {
        id: slug,
        slug,
        nameBn: catInfo.nameBn,
        icon: catInfo.icon,
    };

    return <CategoryPageClient category={category} products={products} />;
}
