'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useFeedStore } from '@/store/feedStore';
import FeedCard from './FeedCard';
import { fetchFeedItems, FeedItem } from '@/lib/shopify';

interface HypeFeedProps {
    theme?: 'street' | 'studio';
}

export default function HypeFeed({ theme = 'street' }: HypeFeedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { currentIndex, setCurrentIndex } = useFeedStore();
    const [fetchedItems, setFetchedItems] = useState<FeedItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch items when theme changes
    useEffect(() => {
        let isMounted = true;

        async function loadItems() {
            setIsLoading(true);
            const data = await fetchFeedItems(theme!);
            if (isMounted) {
                setFetchedItems(data);
                setIsLoading(false);
            }
        }

        loadItems();
        return () => { isMounted = false; };
    }, [theme]);

    // Memoize items to prevent re-creating the array every render
    // We triple the items to create a longer scroll feeling
    const items = useMemo(() => {
        if (fetchedItems.length === 0) return [];
        return [...fetchedItems, ...fetchedItems, ...fetchedItems];
    }, [fetchedItems]);

    // Intersection Observer to track active card
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setCurrentIndex(index);
                    }
                });
            },
            { threshold: 0.6 }
        );

        // Slight delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            const cards = document.querySelectorAll('.feed-card');
            cards.forEach((card) => observer.observe(card));
        }, 100);

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [items, setCurrentIndex]);

    if (isLoading && items.length === 0) {
        return (
            <div className="h-full w-full flex items-center justify-center text-white/50 animate-pulse">
                LOADING {theme?.toUpperCase()} FEED...
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        >
            {items.map((item, index) => (
                <div
                    key={`${item.id}-${index}`}
                    className="feed-card h-full w-full snap-start relative"
                    data-index={index}
                >
                    <FeedCard item={item} isActive={index === currentIndex} />
                </div>
            ))}
        </div>
    );
}
