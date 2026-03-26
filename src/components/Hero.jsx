// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 150, skewY: 5 },
        visible: {
            opacity: 1,
            y: 0,
            skewY: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="home" className="relative w-full overflow-hidden bg-[#0e100f] pt-32 pb-16 min-h-[90vh] flex flex-col justify-between">

            {/* Top GSAP-style decorative shape (Abstract twisted form or similar) */}
            <motion.div
                className="absolute top-24 left-[20%] md:left-[30%] w-24 h-24 md:w-32 md:h-32 opacity-80"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="url(#grad1)" />
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#ff7a7a" />
                            <stop offset="1" stopColor="#ffb07a" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 md:px-12 flex-1 flex flex-col justify-center">

                <motion.div
                    className="flex flex-col items-center md:items-start text-center md:text-left w-full mt-10 md:mt-0"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* First huge line */}
                    <div className="overflow-hidden w-full flex justify-center md:justify-start -mb-2 md:-mb-8">
                        <motion.h1 variants={textVariants} className="font-title font-bold text-[clamp(5rem,15vw,14rem)] leading-[0.8] text-[#f4f0db] tracking-tighter">
                            Capture
                        </motion.h1>
                    </div>

                    {/* Second huge line */}
                    <div className="overflow-hidden w-full flex justify-center md:justify-end mt-4 shadow-sm relative">
                        <motion.h1 variants={textVariants} className="font-title font-bold text-[clamp(5rem,15vw,14rem)] leading-[0.85] text-[#f4f0db] tracking-tight md:mr-10 relative z-10">
                            everything
                        </motion.h1>

                        {/* GSAP-style spiral graphic overlapping the text */}
                        <motion.div
                            className="absolute right-[-10%] bottom-[-50%] md:right-[5%] md:bottom-[-20%] w-32 h-64 md:w-48 md:h-80 z-20 pointer-events-none opacity-90"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.8 }}
                        >
                            <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 10 C 90 20, 90 60, 50 70 C 10 80, 10 120, 50 130 C 90 140, 90 180, 50 190" stroke="url(#spiral-grad)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <linearGradient id="spiral-grad" x1="0" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#a78bfa" />
                                        <stop offset="1" stopColor="#f472b6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>

            </div>

            {/* Bottom info block (GSAP syntax bracket style) */}
            <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 md:px-12 mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-center md:items-end gap-10">

                <motion.div
                    className="flex items-start text-white font-sans-body max-w-lg"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <span className="text-[3rem] md:text-[4rem] font-light text-white leading-none -mt-4 mr-3">{"{"}</span>
                    <p className="text-[15px] md:text-[17px] leading-tight text-white font-medium">
                        Viewfinder Ace – A premier media production studio dedicated to capturing cinematic light, motion, and energy.
                    </p>
                    <span className="text-[3rem] md:text-[4rem] font-light text-white leading-none -mt-4 ml-3">{"}"}</span>
                </motion.div>

                <motion.a
                    href="#portfolio"
                    className="group relative inline-flex items-center gap-2 rounded-full border-2 border-[#0ae448] px-8 py-2 md:py-2.5 text-white text-base font-bold hover:bg-[#0ae448]/10 transition-colors duration-300 focus-visible:outline-none"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                >
                    Explore Work
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                    </div>
                </motion.a>

            </div>
        </section>
    );
}
