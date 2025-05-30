export type Platform = "trendyol" | "hepsiburada";
export interface Product {
    _id?: string;
    platform: Platform;
    productId: string;
    productUrl: string;
    name: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface Review {
    _id?: string;
    productId: string;
    platformReviewId: string;
    username: string;
    rating: number;
    content: string;
    date: string;
    raw?: any;
    createdAt?: string;
}
export interface Summary {
    _id?: string;
    productId: string;
    summaryText: string;
    aiModel: string;
    createdAt?: string;
}
//# sourceMappingURL=types.d.ts.map