// src/components/Footer.jsx
import React from 'react';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0e100f] px-6 md:px-12 py-12 border-t border-white/10 text-[#f4f0db]/50 font-sans-body">
            <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-6">

                <p className="text-[13px] font-bold tracking-tight uppercase">
                    © {new Date().getFullYear()} Viewfinder Ace. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a href="mailto:ace.viewfinder@gmail.com" className="hover:text-[#0ae448] transition-colors duration-300" aria-label="Email">
                        <Mail size={20} strokeWidth={2.5} />
                    </a>
                    <a href="https://www.instagram.com/viewfinder.ace?igsh=MTJscmt0b3ZvbDZ4dw==" target="_blank" rel="noreferrer" className="hover:text-[#0ae448] transition-colors duration-300" aria-label="Instagram">
                        <Instagram size={20} strokeWidth={2.5} />
                    </a>
                </div>

            </div>
        </footer>
    );
}
