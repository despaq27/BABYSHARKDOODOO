"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";

export function Header() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
        >
            {/* Logo / Wordmark */}
            <Link href="/" className="font-display text-lg font-bold tracking-tight">
                RETITLED
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8 font-display text-sm uppercase tracking-widest">
                <Link href="/shop" className="hover:text-accent transition-colors">
                    Shop
                </Link>
                <Link href="/about" className="hover:text-accent transition-colors">
                    About
                </Link>
                <Link href="/lookbook" className="hover:text-accent transition-colors">
                    Lookbook
                </Link>
            </nav>

            {/* Theme Toggle + Cart */}
            <div className="flex items-center gap-6">
                {/* Theme Toggle Button */}
                <motion.button
                    onClick={toggleTheme}
                    className="relative flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground/20 hover:border-foreground/40 transition-colors font-display text-xs uppercase tracking-widest"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.span
                        key={theme}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {theme === "light" ? "Street" : "Studio"}
                    </motion.span>
                    <span className="text-foreground/40">|</span>
                    <span className="text-foreground/60">
                        {theme === "light" ? "🌙" : "☀️"}
                    </span>
                </motion.button>

                {/* Cart */}
                <button className="font-display text-sm uppercase tracking-widest hover:text-accent transition-colors">
                    Cart (0)
                </button>
            </div>
        </motion.header>
    );
}
