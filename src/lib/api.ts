const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.api-store.workers.dev/api/bazardor";

// ============================================
// Types
// ============================================

export interface MarketPrice {
    marketName: string;
    district: string;
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
}

export interface Product {
    _id: string;
    id?: string;
    name: string;
    nameBn?: string;
    emoji: string;
    category: string;
    unit: string;
    todayPrice: number;
    changePercent: number;
    changeType: "up" | "down" | "flat";
    markets?: MarketPrice[];
}

export interface Category {
    _id: string;
    name: string;
    nameBn?: string;
    icon: string;
    slug: string;
}

// ============================================
// Fetcher
// ============================================

async function fetcher<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} on ${endpoint}`);
    }

    return res.json();
}

// ============================================
// Product Endpoints
// ============================================

/** সব পণ্য */
export async function getAllProducts(): Promise<Product[]> {
    return fetcher<Product[]>("/products");
}

/** নির্দিষ্ট ক্যাটাগরির পণ্য */
export async function getProductsByCategory(
    category: string,
): Promise<Product[]> {
    return fetcher<Product[]>(`/products?category=${category}`);
}

/** একটা পণ্যের বিস্তারিত */
export async function getSingleProduct(id: string): Promise<Product> {
    return fetcher<Product>(`/products/${id}`);
}

// ============================================
// Category Endpoints
// ============================================

/** সব ক্যাটাগরি */
export async function getCategories(): Promise<Category[]> {
    return fetcher<Category[]>("/categories");
}

/** একটা ক্যাটাগরির তথ্য */
export async function getSingleCategory(slug: string): Promise<Category> {
    return fetcher<Category>(`/categories/${slug}`);
}
