import Client from 'shopify-buy';
import { STREET_VIBES, STUDIO_VIBES } from '@/data/vibes';

// Define the shape of our Feed Item to match the detailed design
export interface FeedItem {
    id: string;
    type: 'product' | 'vibe' | 'trip';
    title: string;
    description?: string;
    price?: number;
    image: string;
    author?: string;
    artist?: string;
    cta?: string;
    ctaLink?: string;
    handle?: string; // Shopify handle for linking
}

// Full Mock Fallbacks (for when no Shopify creds exist)
const MOCK_STREET_FALLBACK: FeedItem[] = [
    { id: 'street-1', type: 'product', title: 'Oversized Graphic Hoodie', price: 120, image: '/assets/hype-feed/product-hoodie.png', handle: 'oversized-graphic-hoodie' },
    { id: 'street-4', type: 'product', title: 'Cargo Tech Pants', price: 180, image: '/assets/hype-feed/product-hoodie.png', handle: 'cargo-tech-pants' },
    ...STREET_VIBES
];

const MOCK_STUDIO_FALLBACK: FeedItem[] = [
    ...STUDIO_VIBES,
    { id: 'studio-2', type: 'product', title: 'Cozy Knit Essentials', price: 85, image: '/assets/hype-feed/studio/studio_v2_2_park_cozy_1765015718679.png', handle: 'cozy-knit-essentials' },
    { id: 'studio-4', type: 'product', title: 'Party Collection', price: 110, image: '/assets/hype-feed/studio/studio_v2_1_night_out_flash_1765015704274.png', handle: 'party-collection' },
];

export const shopifyClient = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'mock-store.myshopify.com',
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || 'mock-token',
    apiVersion: '2024-01',
});

export async function fetchFeedItems(theme: 'street' | 'studio'): Promise<FeedItem[]> {
    const isMock = !process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || !process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

    // 1. If credentials are missing, return Mock Data immediately
    if (isMock) {
        console.log(`[Shopify] No credentials found. Serving mock data for ${theme}.`);
        return theme === 'street' ? MOCK_STREET_FALLBACK : MOCK_STUDIO_FALLBACK;
    }

    // 2. Fetch real products from Shopify
    try {
        // Fetch all products (limit 20 for now)
        // TODO: In the future, we can add a query here to filter by tag: query: `tag:${theme}`
        const products = await shopifyClient.product.fetchAll(20);

        // Map Shopify products to our FeedItem format
        const productItems: FeedItem[] = products.map((p) => ({
            id: p.id as string,
            type: 'product',
            title: p.title,
            description: p.description,
            price: Number(p.variants[0]?.price?.amount || 0),
            image: p.images[0]?.src || '',
            handle: p.handle,
            cta: 'Shop Now',
            ctaLink: `/products/${p.handle}`,
        }));

        // Load distinct vibes for the theme from our local file
        const baseVibes = theme === 'street' ? STREET_VIBES : STUDIO_VIBES;

        // Interleave Logic: [Vibe, Product, Vibe, Product...]
        const mixedFeed: FeedItem[] = [];
        const maxLen = Math.max(productItems.length, baseVibes.length);

        for (let i = 0; i < maxLen; i++) {
            if (baseVibes[i]) mixedFeed.push(baseVibes[i]);
            if (productItems[i]) mixedFeed.push(productItems[i]);
        }

        return mixedFeed;

    } catch (error) {
        console.error('[Shopify] Failed to fetch products:', error);
        // Fallback on error
        return theme === 'street' ? MOCK_STREET_FALLBACK : MOCK_STUDIO_FALLBACK;
    }
}
