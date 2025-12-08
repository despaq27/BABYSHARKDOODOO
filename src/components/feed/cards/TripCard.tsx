'use client';

import { motion } from 'framer-motion';
import { FeedItem } from '../FeedCard';
import Image from 'next/image';

interface CardProps {
    item: FeedItem;
    isActive: boolean;
}

export default function TripCard({ item, isActive }: CardProps) {
    return (
        <div className="absolute inset-0 w-full h-full bg-[#1a0524]">
            <div className="absolute inset-0 z-0 animate-pulse-slow">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hue-rotate-15 mix-blend-lighten"
                    priority={isActive}
                />
                {/* Abstract Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent mix-blend-overlay" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <motion.h1
                    className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-center uppercase tracking-widest blur-sm"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    {item.artist}
                </motion.h1>
            </div>

            <div className="absolute bottom-12 w-full text-center z-20">
                <p className="text-xs font-mono uppercase tracking-[0.5em] text-white/50">Digital Artifact #009</p>
            </div>
        </div>
    );
}
