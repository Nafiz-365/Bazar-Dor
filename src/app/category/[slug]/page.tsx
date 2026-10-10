import { notFound } from "next/navigation";
import CategoryPageClient from "@/components/CategoryPageClient";
import type { Category } from "@/lib/api";

// Slugs here match the URL pattern; apiFilter must match actual API category values
// API category values: chal, dal, tel, sobji, mach, mangsho, dim-dui, mosla
const CATEGORY_INFO: Record<
    string,
    { nameBn: string; icon: string; apiFilter: string }
> = {
    chal:       { nameBn: "চাল",       icon: "🍚",  apiFilter: "chal" },
    dal:        { nameBn: "ডাল",       icon: "🫘",  apiFilter: "dal" },
    tel:        { nameBn: "তেল",       icon: "🛢️", apiFilter: "tel" },
    // sobji = API value; shobji = old navbar slug (both supported)
    sobji:      { nameBn: "সবজি",      icon: "🥬",  apiFilter: "sobji" },
    shobji:     { nameBn: "সবজি",      icon: "🥬",  apiFilter: "sobji" },
    mach:       { nameBn: "মাছ",       icon: "🐟",  apiFilter: "mach" },
    mangsho:    { nameBn: "মাংস",      icon: "🍗",  apiFilter: "mangsho" },
    // dim-dui = API value; dim-murgi = old navbar slug (both supported)
    "dim-dui":  { nameBn: "ডিম-দুধ",  icon: "🥛",  apiFilter: "dim-dui" },
    "dim-murgi":{ nameBn: "ডিম-মুর্গি", icon: "🥚", apiFilter: "dim-dui" },
    // mosla = API value; moshla = old navbar slug (both supported)
    mosla:      { nameBn: "মসলা",      icon: "🌶️", apiFilter: "mosla" },
    moshla:     { nameBn: "মসলা",      icon: "🌶️", apiFilter: "mosla" },
};

import { getProductsByCategory } from "@/lib/api";

export const dynamic = "force-dynamic";

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

    const initialProducts = await getProductsByCategory(catInfo.apiFilter);

    return (
        <CategoryPageClient
            key={slug}
            category={category}
            apiFilter={catInfo.apiFilter}
            initialProducts={initialProducts}
        />
    );
}
