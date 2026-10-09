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

async function fetcher<T>(endpoint: string): Promise<T> {
    // Try primary URL first
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            next: { revalidate: 3600 },
        });
        if (res.ok) return res.json();
    } catch {
        // Fall through to alternate
    }

    // Fallback to alternate URL
    try {
        const res2 = await fetch(`${ALT_BASE_URL}${endpoint}`, {
            next: { revalidate: 3600 },
        });
        if (res2.ok) return res2.json();
    } catch {
        // Fall through
    }

    throw new Error(`API error on ${endpoint}`);
}

export async function getAllProducts(): Promise<Product[]> {
    try {
        return await fetcher<Product[]>("/products");
    } catch (err) {
        console.error("Failed to fetch all products:", err);
        return [];
    }
}

export async function getProductsByCategory(
    category: string,
): Promise<Product[]> {
    try {
        return await fetcher<Product[]>(
            `/products?category=${encodeURIComponent(category)}`,
        );
    } catch (err) {
        console.error(`Failed to fetch products for ${category}:`, err);
        return [];
    }
}

export async function getSingleProduct(id: string): Promise<Product | null> {
    try {
        return await fetcher<Product>(`/products/${id}`);
    } catch (err) {
        console.error(`Failed to fetch product ${id}:`, err);
        return null;
    }
}

export async function getCategories(): Promise<Category[]> {
    try {
        return await fetcher<Category[]>("/categories");
    } catch (err) {
        console.error("Failed to fetch categories:", err);
        return [];
    }
}

export async function getSingleCategory(
    slug: string,
): Promise<Category | null> {
    try {
        return await fetcher<Category>(`/categories/${slug}`);
    } catch (err) {
        console.error(`Failed to fetch category ${slug}:`, err);
        return null;
    }
}
