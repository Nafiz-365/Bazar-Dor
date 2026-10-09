// ============================================
// Bengali Number Conversion
// ============================================

/**
 * ইংরেজি সংখ্যাকে বাংলা সংখ্যায় convert করে
 * উদাহরণ: 148 → "১৪৮", 1850 → "১৮৫০"
 */
export function toBengaliNumber(num: number | string): string {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
}

/**
 * কমা দিয়ে সংখ্যা format করে তারপর বাংলায় convert করে
 * উদাহরণ: 1850 → "১,৮৫০", 148 → "১৪৮"
 */
export function formatPrice(price: number): string {
    const formatted = price.toLocaleString("en-IN");
    return toBengaliNumber(formatted);
}

/**
 * Percentage কে বাংলায় format করে
 * উদাহরণ: 2.1 → "২.১", 11.0 → "১১.০"
 */
export function formatPercent(percent: number): string {
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
