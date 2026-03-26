// src/components/Footer.jsx
import React from 'react';
import { Camera } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-neutral-800/60 py-12 md:py-20 text-center text-neutral-400 bg-[#050505]">
            <div className="flex flex-col items-center justify-center gap-6">
                <Camera size={28} className="text-neutral-600" />
                <p className="text-sm tracking-[0.2em] uppercase font-sans-body text-neutral-500">
                    © {new Date().getFullYear()} Viewfinder Ace
                </p>
                <p className="text-xs text-neutral-600 max-w-sm px-4">
                    Capturing light, motion, and quiet moments.
                </p>
            </div>
        </footer>
    );
}
