"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
    const theme = useThemeStore((state) => state.theme);
    const isWomen = theme === "light";

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={theme}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <Image
                            src={isWomen ? "/images/hero-light.png" : "/images/hero-dark.png"}
                            alt="Background"
                            fill
                            className="object-cover object-center opacity-40 mix-blend-multiply dark:mix-blend-overlay dark:opacity-20"
                            priority
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto mt-20 md:mt-0">
                {/* Tagline Above */}
                <motion.p
                    key={theme}
                    className="font-display text-sm uppercase tracking-[0.3em] text-foreground/80 mb-6 drop-shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {isWomen ? "Studio. Collection." : "Street. Division."}
                </motion.p>

                {/* Main Headline with Animation */}
                <div className="scale-125 md:scale-150 mb-8">
                    <AnimatedText
                        text="RETITLED"
                        className="drop-shadow-lg"
                        delay={0}
                    />
                </div>

                {/* Subheadline */}
                <motion.p
                    key={`sub-${theme}`}
                    className="font-body text-lg md:text-xl text-foreground/80 max-w-xl mx-auto mb-10 drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    {isWomen
                        ? "Essential fits. Elevated basics. The new standard for your rotation."
                        : "Heavyweight cottons. Industrial cuts. Built for the concrete."
                    }
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                >
                    <Link
                        href={isWomen ? "/scroll-to-shop?theme=studio" : "/scroll-to-shop?theme=street"}
                        className="btn btn-primary min-w-[200px] backdrop-blur-sm bg-foreground/90 hover:bg-foreground"
                    >
                        {isWomen ? "Shop Collection" : "Shop Street"}
                    </Link>
                    <button className="btn btn-outline min-w-[200px] backdrop-blur-sm bg-background/50 hover:bg-background/80 border-foreground/30">
                        View Lookbook
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2 backdrop-blur-sm"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.div className="w-1 h-2 bg-foreground/50 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
