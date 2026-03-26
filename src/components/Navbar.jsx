// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Mail } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    // Handle glass effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links = [
        { name: 'Home', href: '#home' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <>
            <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? 'glass border-b border-neutral-800/60 py-2' : 'bg-transparent py-6'}`}>
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <div className="flex items-center justify-between">

                        {/* Desktop Nav Left */}
                        <nav className="hidden md:flex gap-10 text-xs tracking-widest text-neutral-400 uppercase font-medium">
                            {links.slice(0, 2).map(link => (
                                <a key={link.name} href={link.href} className="hover:text-white transition-colors duration-300">
                                    {link.name}
                                </a>
                            ))}
                        </nav>

                        {/* Logo */}
                        <div className="text-center flex-1 md:flex-none">
                            <a href="#home" className="font-title text-2xl md:text-3xl tracking-widest text-white inline-flex items-center gap-2">
                                <span>Viewfinder</span>
                                <span className="text-neutral-500 italic font-light">Ace</span>
                            </a>
                        </div>

                        {/* Desktop Nav Right & Socials */}
                        <div className="hidden md:flex items-center gap-10 text-xs tracking-widest text-neutral-400 uppercase font-medium">
                            {links.slice(2).map(link => (
                                <a key={link.name} href={link.href} className="hover:text-white transition-colors duration-300">
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex items-center gap-5 ml-2 pl-8 border-l border-neutral-800/50">
                                <a href="#contact" className="hover:text-white transition-colors" aria-label="Contact">
                                    <Mail size={16} />
                                </a>
                                <a href="https://www.instagram.com/viewfinder.ace?igsh=MTJscmt0b3ZvbDZ4dw==" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                                    <Instagram size={16} />
                                </a>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-neutral-300 hover:text-white focus:outline-none"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <Menu size={24} />
                        </button>

                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        className="fixed inset-0 z-50 bg-[#050505] flex flex-col justify-center items-center cinematic-shadow"
                    >
                        <button
                            className="absolute top-8 right-6 text-neutral-400 hover:text-white focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <X size={32} />
                        </button>
                        <nav className="flex flex-col items-center gap-10">
                            {links.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={toggleMenu}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 + 0.1, ease: 'easeOut' }}
                                    className="font-title text-4xl text-neutral-200 hover:text-white italic tracking-wide"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </nav>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-16 flex gap-8 text-neutral-500"
                        >
                            <a href="#contact" onClick={toggleMenu} className="hover:text-white transition-colors"><Mail size={24} /></a>
                            <a href="https://www.instagram.com/viewfinder.ace?igsh=MTJscmt0b3ZvbDZ4dw==" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram size={24} /></a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
