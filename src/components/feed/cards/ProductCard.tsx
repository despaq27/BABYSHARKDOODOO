'use client';

import { motion } from 'framer-motion';
import { FeedItem } from '../FeedCard';
import Image from 'next/image';

interface CardProps {
    item: FeedItem;
    isActive: boolean;
}

export default function ProductCard({ item, isActive }: CardProps) {
    return (
        <div className="absolute inset-0 w-full h-full">
            {/* Background Image/Video */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority={isActive}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            </div>

            {/* UI Overlay */}
            <div className="absolute bottom-24 left-6 z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isActive ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-white/10 backdrop-blur-md px-2 py-1 text-xs font-mono rounded-sm border border-white/20">NEW DROP</span>
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2 text-white shadow-black drop-shadow-lg">
                        {item.title}
                    </h2>
                    <p className="text-2xl font-mono text-green-400 font-bold">${item.price}</p>
                </motion.div>
            </div>

            {/* Side Actions (Like, Share) - Placeholder */}
            <div className="absolute right-4 bottom-32 flex flex-col space-y-6 z-20">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    ❤️
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    💬
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    🔗
                </div>
            </div>
        </div>
    );
}
