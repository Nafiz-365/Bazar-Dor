const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.api-store.workers.dev/api/bazardor";

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
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status} on ${endpoint}`);
    return res.json();
}

export async function getAllProducts(): Promise<Product[]> {
    return fetcher<Product[]>("/products");
}

export async function getProductsByCategory(
    category: string,
): Promise<Product[]> {
    return fetcher<Product[]>(`/products?category=${category}`);
}

export async function getSingleProduct(id: string): Promise<Product> {
    return fetcher<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
    return fetcher<Category[]>("/categories");
}

export async function getSingleCategory(slug: string): Promise<Category> {
    return fetcher<Category>(`/categories/${slug}`);
}
