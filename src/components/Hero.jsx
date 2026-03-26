// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505] to-transparent pointer-events-none z-10" />

            <div className="relative z-20 mx-auto max-w-7xl px-6 md:px-12 w-full">
                <motion.div
                    className="max-w-4xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p variants={itemVariants} className="uppercase tracking-[0.3em] text-neutral-500 text-xs font-semibold mb-6">
                        Viewfinder Ace Portfolio
                    </motion.p>

                    <motion.h1 variants={itemVariants} className="font-title text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-neutral-100 tracking-tight">
                        Crafted with <span className="text-white italic font-normal">intention</span>,<br />
                        delivered with <span className="text-neutral-400">precision</span>.
                    </motion.h1>

                    <motion.p variants={itemVariants} className="mt-8 text-neutral-400 max-w-xl text-sm md:text-base leading-relaxed font-light">
                        A curated collection of photographs exploring light, motion, and quiet moments. Cinematic narratives transformed into timeless visuals.
                    </motion.p>

                    <motion.div variants={itemVariants} className="mt-12">
                        <a
                            href="#portfolio"
                            className="inline-flex items-center gap-3 uppercase tracking-widest text-xs font-semibold text-neutral-300 hover:text-white transition-colors group relative"
                        >
                            <span className="relative z-10">Enter Gallery</span>
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative gradient orb for atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neutral-900/10 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}
