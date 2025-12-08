"use client";

import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
    as?: "h1" | "h2" | "h3" | "p" | "span";
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        },
    },
};

const letterVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export function AnimatedText({
    text,
    className = "",
    delay = 0,
    as: Component = "h1",
}: AnimatedTextProps) {
    const letters = text.split("");

    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ transitionDelay: `${delay}s` }}
        >
            <Component className="inline-flex flex-wrap">
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        className={letter === " " ? "w-[0.3em]" : ""}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </Component>
        </motion.div>
    );
}
