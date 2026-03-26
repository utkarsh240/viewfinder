// src/components/Lightbox.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose, onNext, onPrev]);

    return (
        <AnimatePresence>
            {currentIndex !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-sm flex items-center justify-center"
                    onClick={onClose}
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Overlay Image */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 py-16 md:p-8">
                        <motion.img
                            key={currentIndex} // forces re-render/animation on index change
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                            src={encodeURI(images[currentIndex].src)}
                            alt={images[currentIndex].alt}
                            className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl cinematic-shadow"
                            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
                        />
                    </div>

                    {/* Top Controls */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                        <p className="hidden md:block text-neutral-400 font-sans-body text-xs tracking-widest uppercase font-semibold">
                            {currentIndex + 1} / {images.length} — {images[currentIndex].alt}
                        </p>
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="ml-auto flex items-center gap-2 group text-neutral-400 hover:text-white transition-colors focus:outline-none"
                        >
                            <span className="hidden md:block text-xs uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                            <X size={28} />
                        </button>
                    </div>

                    {/* Side Controls */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-neutral-500 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-neutral-500 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
                        aria-label="Next image"
                    >
                        <ChevronRight size={32} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
