// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Showcase', href: '#portfolio' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <>
            <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0e100f]/90 backdrop-blur-md shadow-sm border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
                <div className="mx-auto max-w-[1400px] px-6 md:px-12">
                    <div className="flex items-center justify-between">

                        {/* Logo (GSAP Style bold italic) */}
                        <div className="flex-none">
                            <a href="#home" className="font-title text-3xl font-black italic tracking-tighter text-[#f4f0db] hover:text-white transition-colors flex items-center">
                                <span>VIEWFINDER <span className="text-[#0ae448]"> ACE</span></span>
                            </a>
                        </div>

                        {/* Desktop Nav Middle */}
                        <nav className="hidden md:flex flex-1 justify-center gap-8 text-[15px] font-semibold text-neutral-400">
                            {links.map(link => (
                                <a key={link.name} href={link.href} className="hover:text-[#f4f0db] transition-colors duration-200">
                                    {link.name}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop Nav Right */}
                        <div className="hidden md:flex items-center gap-6 justify-end">
                            <a href="#contact" className="text-[14px] font-semibold text-neutral-400 hover:text-white transition-colors">
                                Client Portal
                            </a>
                            <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-white text-white px-6 py-1.5 text-[15px] font-bold hover:bg-white hover:text-black transition-all duration-300">
                                Book Us
                            </a>
                        </div>
                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-[#f4f0db] focus:outline-none"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <Menu size={28} />
                        </button>

                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="fixed inset-0 z-50 bg-[#0e100f] flex flex-col justify-center items-center px-6"
                    >
                        <button
                            className="absolute top-6 right-6 text-neutral-400 hover:text-white focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <X size={32} />
                        </button>
                        <nav className="flex flex-col items-center gap-8 w-full">
                            {links.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={toggleMenu}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1, ease: 'easeOut' }}
                                    className="font-title text-4xl font-bold tracking-tight text-[#f4f0db] hover:text-[#0ae448] transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                onClick={toggleMenu}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 font-title text-xl font-bold rounded-full border border-[#0ae448] text-[#0ae448] px-8 py-3 w-full max-w-xs text-center hover:bg-[#0ae448] hover:text-[#0e100f] transition-colors"
                            >
                                Contact Us
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
