'use client';

import { motion } from 'framer-motion';
import { FeedItem } from '../FeedCard';
import Image from 'next/image';

interface CardProps {
    item: FeedItem;
    isActive: boolean;
}

export default function VibeCard({ item, isActive }: CardProps) {
    return (
        <div className="absolute inset-0 w-full h-full">
            {/* Background Image/Video with Filters */}
            <div className="absolute inset-0 z-0">
                {/* VHS Noise Overlay Simulation */}
                <div className="absolute inset-0 opacity-10 pointer-events-none z-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover brightness-75 contrast-125 sepia-[0.2]"
                    priority={isActive}
                />
            </div>

            <div className="absolute bottom-24 left-6 z-10 max-w-xs">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={isActive ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden relative border border-white">
                            {/* Avatar Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-orange-500" />
                        </div>
                        <span className="text-sm font-bold tracking-wider">{item.author}</span>
                    </div>
                    <p className="text-lg italic font-serif leading-tight">
                        "Caught this vibe downtown last night. The quality is insane."
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
