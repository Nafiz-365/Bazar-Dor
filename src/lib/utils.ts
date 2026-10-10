// ============================================
// Bengali Number Conversion
// ============================================

/**
 * ইংরেজি সংখ্যাকে বাংলা সংখ্যায় convert করে
 * উদাহরণ: 148 → "১৪৮", 1850 → "১৮৫০"
 */

export function toBengaliNumber(
    num: number | string | undefined | null,
): string {
    if (num === undefined || num === null || isNaN(Number(num))) {
        return "০";
    }
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
}
/**
 * কমা দিয়ে সংখ্যা format করে তারপর বাংলায় convert করে
 * উদাহরণ: 1850 → "১,৮৫০", 148 → "১৪৮"
 */
export function formatPrice(price: number | undefined | null): string {
    if (price === undefined || price === null || isNaN(Number(price))) {
        return "—";
    }
    const formatted = Number(price).toLocaleString("en-IN");
    return toBengaliNumber(formatted);
}

/**
 * Percentage কে বাংলায় format করে
 * উদাহরণ: 2.1 → "২.১", 11.0 → "১১.০"
 */
export function formatPercent(percent: number | undefined | null): string {
    if (percent === undefined || percent === null || isNaN(Number(percent))) {
        return "০.০";
    }
    const abs = Math.abs(percent).toFixed(1);
    return toBengaliNumber(abs);
}

// ============================================
// Change Badge Helpers
// ============================================

/**
 * দাম বাড়লে লাল, কমলে সবুজ, অপরিবর্তিত থাকলে ধূসর
 */
export function getChangeColor(type: "up" | "down" | "flat"): string {
    if (type === "up") return "text-red-500";
    if (type === "down") return "text-green-500";
    return "text-gray-400";
}

/**
 * দাম বাড়লে ▲, কমলে ▼, অপরিবর্তিত থাকলে —
 */
export function getChangeIcon(type: "up" | "down" | "flat"): string {
    if (type === "up") return "▲";
    if (type === "down") return "▼";
    return "—";
}

/**
 * Badge-এর background color
 */
export function getChangeBg(type: "up" | "down" | "flat"): string {
    if (type === "up") return "bg-red-50";
    if (type === "down") return "bg-green-50";
    return "bg-gray-50";
}

// ============================================
// Slug Helpers
// ============================================

/**
 * Product name থেকে URL-safe slug বানায় (Bangla character গুলো maintain করে)
 */
export function createSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\u0980-\u09FF-]/g, "");
}

/**
 * Unit-কে বাংলায় translate করে
 */
export function translateUnit(unit: string): string {
    const map: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };
    return map[unit] || unit;
}

// ============================================
// Category Slug Helpers
// ============================================

/**
 * Maps the product's internal `category` field value to the URL slug.
 * The API's categories endpoint and the product's category field use different values
 * for some categories (e.g. 'shobji' → 'sobji', 'dim-murgi' → 'dim-dui', 'moshla' → 'mosla').
 */
/**
 * Maps a URL slug (from the navbar) to the API's category filter value.
 * The API uses: chal, dal, tel, sobji, mach, mangsho, dim-dui, mosla
 */
export function categoryToUrlSlug(apiCategory: string): string {
    // API already uses the correct slugs — just return as-is
    // (sobji, dim-dui, mosla are the API's actual values)
    return apiCategory;
}

/**
 * Maps a navbar/URL slug to the API's category filter param.
 * Navbar slugs like 'shobji' must map to the API's 'sobji'.
 */
export function navSlugToApiFilter(navSlug: string): string {
    const map: Record<string, string> = {
        shobji: "sobji",
        "dim-murgi": "dim-dui",
        moshla: "mosla",
    };
    return map[navSlug] || navSlug;
}
