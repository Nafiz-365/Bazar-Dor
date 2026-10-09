const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.api-store.workers.dev/api/bazardor";

const ALT_BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

export interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

export interface Change {
    dir: "up" | "down" | "flat";
    pct: number;
}

export interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: Change;
    markets: Market[];
}

export interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

async function fetcher<T>(endpoint: string): Promise<T | null> {
    // Try primary URL first
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            next: { revalidate: 3600 },
        });
        if (res.ok) return await res.json();
    } catch {
        // Fall through to alternate
    }

    // Fallback to alternate URL
    try {
        const res2 = await fetch(`${ALT_BASE_URL}${endpoint}`, {
            next: { revalidate: 3600 },
        });
        if (res2.ok) return await res2.json();
    } catch {
        // Fall through
    }

    // Graceful fallback when remote API is rate-limited (429) or offline
    return null;
}

export async function getAllProducts(): Promise<Product[]> {
    const data = await fetcher<Product[]>("/products");
    return data || [];
}

export async function getProductsByCategory(
    category: string,
): Promise<Product[]> {
    const data = await fetcher<Product[]>(
        `/products?category=${encodeURIComponent(category)}`,
    );
    return data || [];
}

export async function getSingleProduct(id: string): Promise<Product | null> {
    return await fetcher<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
    const data = await fetcher<Category[]>("/categories");
    return data || [];
}

export async function getSingleCategory(
    slug: string,
): Promise<Category | null> {
    return await fetcher<Category>(`/categories/${slug}`);
}
