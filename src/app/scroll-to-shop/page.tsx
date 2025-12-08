"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HypeFeed from '@/components/feed/HypeFeed';

function FeedContent() {
    const searchParams = useSearchParams();
    const theme = searchParams.get('theme') as 'street' | 'studio' | null;

    return (
        <main className="fixed inset-0 w-full h-full bg-black overflow-hidden touch-none">
            <HypeFeed theme={theme || 'street'} />
            {/* Overlay Navigation / UI could go here (e.g. Back button, Global Cart) */}
        </main>
    );
}

export default function ScrollToShopPage() {
    return (
        <Suspense fallback={<div className="bg-black w-full h-full" />}>
            <FeedContent />
        </Suspense>
    );
}
