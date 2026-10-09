import { notFound } from "next/navigation";
import CategoryPageClient from "@/components/CategoryPageClient";
import type { Category } from "@/lib/api";

// Slugs here match the product's category field in the API
const CATEGORY_INFO: Record<
    string,
    { nameBn: string; icon: string; apiFilter: string }
> = {
    chal: { nameBn: "চাল", icon: "🍚", apiFilter: "chal" },
    dal: { nameBn: "ডাল", icon: "🫘", apiFilter: "dal" },
    tel: { nameBn: "তেল", icon: "🛢️", apiFilter: "tel" },
    shobji: { nameBn: "সবজি", icon: "🥬", apiFilter: "shobji" },
    sobji: { nameBn: "সবজি", icon: "🥬", apiFilter: "shobji" },
    mach: { nameBn: "মাছ", icon: "🐟", apiFilter: "mach" },
    mangsho: { nameBn: "মাংস", icon: "🍗", apiFilter: "mangsho" },
    "dim-murgi": { nameBn: "ডিম-মুর্গি", icon: "🥚", apiFilter: "dim-murgi" },
    "dim-dui": { nameBn: "ডিম-দুধ", icon: "🥛", apiFilter: "dim-murgi" },
    moshla: { nameBn: "মসলা", icon: "🌶️", apiFilter: "moshla" },
    mosla: { nameBn: "মসলা", icon: "🌶️", apiFilter: "moshla" },
};

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Invalid slug? → 404
    const catInfo = CATEGORY_INFO[slug];
    if (!catInfo) notFound();

    const category: Category = {
        id: slug,
        slug,
        nameBn: catInfo.nameBn,
        icon: catInfo.icon,
    };

    return (
        <CategoryPageClient
            category={category}
            apiFilter={catInfo.apiFilter}
        />
    );
}
