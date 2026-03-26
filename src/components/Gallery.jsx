// src/components/Gallery.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function Gallery({ images, openLightbox }) {
    return (
        <section id="portfolio" className="relative bg-[#050505] py-24 z-10">
            <div className="mx-auto max-w-[1400px] px-6 ">

                {/* Section Header */}
                <div className="flex items-center gap-6 mb-16 justify-center">
                    <div className="h-px w-24 bg-neutral-800" />
                    <Camera size={20} className="text-neutral-600" />
                    <div className="h-px w-24 bg-neutral-800" />
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {images.map((img, index) => {
                        const base = img.src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
                        const webpSet = `${encodeURI(base + '-w1600.webp')} 1600w, ${encodeURI(base + '-w1024.webp')} 1024w, ${encodeURI(base + '-w640.webp')} 640w`;
                        const jpgSet = `${encodeURI(base + '-w1600.jpg')} 1600w, ${encodeURI(base + '-w1024.jpg')} 1024w, ${encodeURI(base + '-w640.jpg')} 640w`;

                        return (
                            <motion.button
                                key={img.src}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                onClick={() => openLightbox(index)}
                                className="group relative block w-full overflow-hidden avoid-break-inside bg-neutral-900 focus:outline-none [backface-visibility:hidden] [transform:translateZ(0)]"
                            >
                                <picture>
                                    <source type="image/webp" srcSet={webpSet} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                                    <img
                                        src={encodeURI(img.src)}
                                        srcSet={jpgSet}
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        alt={img.alt}
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) => { e.currentTarget.removeAttribute('srcset'); e.currentTarget.src = img.src; }}
                                        className="w-full h-auto object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03] will-change-transform [backface-visibility:hidden]"
                                    />
                                </picture>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                    <p className="text-white font-sans-body uppercase tracking-widest text-xs font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        {img.alt}
                                    </p>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
