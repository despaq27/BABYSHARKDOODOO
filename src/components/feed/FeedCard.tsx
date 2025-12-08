'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { useFeedStore } from '@/store/feedStore';
import ProductCard from './cards/ProductCard';
import VibeCard from './cards/VibeCard';
import TripCard from './cards/TripCard';

export interface FeedItem {
    id: string;
    type: string;
    title: string;
    price?: number;
    author?: string;
    artist?: string;
    image: string;
}

interface FeedCardProps {
    item: FeedItem;
    isActive: boolean;
}

export default function FeedCard({ item, isActive }: FeedCardProps) {
    const [isLongPressed, setIsLongPressed] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [showCartFeedback, setShowCartFeedback] = useState(false);

    const { addToCart, addToWishlist } = useFeedStore();
    const pressTimer = useRef<NodeJS.Timeout>(null);

    // Swipe Handler (Add to Cart)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bindDrag = useDrag(({ movement: [mx, my], swipe: [swipeX] }) => {
        // Only trigger if horizontal swipe is dominant and significant
        if (swipeX > 0 || (mx > 150 && Math.abs(my) < 50)) {
            addToCart(item.id);
            setShowCartFeedback(true);
            setTimeout(() => setShowCartFeedback(false), 2000);
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate(200);
            }
        }
    });

    // Long Press Handlers (Custom/Native)
    const handleTouchStart = () => {
        pressTimer.current = setTimeout(() => {
            setIsLongPressed(true);
        }, 500);
    };

    const handleTouchEnd = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current);
        setIsLongPressed(false);
    };

    // Double Click Handler (Heart)
    const handleDoubleClick = () => {
        addToWishlist(item.id);
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 1200);
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate([50, 50]);
        }
    };

    const renderCardContent = () => {
        switch (item.type) {
            case 'product': return <ProductCard item={item} isActive={isActive} />;
            case 'vibe': return <VibeCard item={item} isActive={isActive} />;
            case 'trip': return <TripCard item={item} isActive={isActive} />;
            default: return null;
        }
    };

    return (
        <div
            className="relative w-full h-full bg-black text-white overflow-hidden touch-pan-y"
            {...bindDrag()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleTouchStart} // For desktop testing
            onMouseUp={handleTouchEnd}     // For desktop testing
        >
            <motion.div className="w-full h-full pointer-events-none">
                {renderCardContent()}
            </motion.div>

            {/* Heart Animation Overlay */}
            <AnimatePresence>
                {showHeart && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5, rotate: [0, -10, 10, 0] }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
                    >
                        <span className="text-9xl filter drop-shadow-2xl">❤️</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Feedback Overlay */}
            <AnimatePresence>
                {showCartFeedback && (
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        className="absolute top-1/2 right-10 z-40 bg-green-500 text-black px-6 py-4 rounded-full font-black uppercase tracking-wider transform -translate-y-1/2 shadow-2xl skew-x-[-10deg]"
                    >
                        CHA-CHING! 💸
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Look Overlay (Long Press) */}
            <AnimatePresence>
                {isLongPressed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-8"
                        // Prevent event bubbling so dragging on overlay doesn't do weird things
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10 max-w-sm w-full pointer-events-auto">
                            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wide">{item.title}</h2>
                            {item.price && <p className="text-xl text-green-400 font-mono mb-4">${item.price}</p>}
                            <p className="text-zinc-400 text-sm">Quick Look Details... <br /> Size: L <br /> Stock: Low</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
