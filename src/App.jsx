import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

// Components
import NoiseOverlay from './components/ui/NoiseOverlay';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';

const defaultImageFiles = [
  "DSC07642 copy.jpg",
  "DSC07635 copy 2.jpg",
  "DSC00507 copy.jpg",
  "DSC00397 copy.jpg",
  "DSC00268 copy.jpg",
  "DSC00289 copy.jpg",
  "DSC00489 copy.jpg",
  "DSC00096 copy.jpg",
  "DSC00285 copy.jpg",
  "DSC00287 copy.jpg",
  "DSC00324.jpg",
  "DSC00068.jpg",
  "DSC06711 copy.jpg",
  "DSC01493 copy.jpg",
  "DSC01407.jpg",
  "DSC01463 copy.jpg",
  "DSC06496.jpg",
  "DSC06500 copy.jpg",
  "DSC00564 copy.jpg",
  "DSC00716.jpg",
  "_DSC3790 copy.jpg",
  "_DSC3739 copy.jpg",
  "_DSC3753.JPG",
  "_DSC3739.JPG",
  "_DSC3790.JPG",
  "DSC01896 copy 5.jpg",
  "DSC01931 copy 3.jpg",
  "DSC01969-Enhanced-NR copy.jpg",
  "DSC01275-Enhanced-NR copy.jpg",
  "DSC01261-Enhanced-NR copy 2.jpg",
  "DSC01251-Enhanced-NR copy.jpg",
  "DSC00201-Enhanced-NR copy 3.jpg",
  "DSC00128-Enhanced-NR copy 2.jpg",
  "DSC00097-Enhanced-NR copy 3.jpg",
  "DSC00127-Enhanced-NR copy.jpg",
];

function toAltText(fileName) {
  return fileName
    .replace(/[_-]/g, ' ')
    .replace(/copy/gi, '')
    .replace(/enhanced/gi, '')
    .replace(/nr/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function App() {
  const [imageFiles, setImageFiles] = useState(defaultImageFiles);

  useEffect(() => {
    fetch('/portfolio.json')
      .then((res) => {
        if (!res.ok) throw new Error('manifest not found');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length) setImageFiles(data);
      })
      .catch(() => { });
  }, []);

  const images = useMemo(() => imageFiles.map((f) => ({
    src: `/portfolio/${f}`,
    alt: toAltText(f),
  })), [imageFiles]);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + images.length - 1) % images.length));
  }, [images.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  return (
    <div className="font-sans-body bg-[#050505] text-neutral-200 min-h-screen selection:bg-neutral-800 selection:text-white">
      <NoiseOverlay />
      <Navbar />

      <main>
        <Hero />

        {/* Gallery */}
        <div className="mx-auto max-w-[1400px]">
          <Gallery images={images} openLightbox={openLightbox} />
        </div>

        {/* About Section */}
        <section id="about" className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
          <h3 className="font-title text-5xl md:text-6xl text-white mb-10 tracking-widest uppercase font-semibold">About</h3>
          <div className="h-px w-16 bg-neutral-800 mx-auto mb-10" />
          <p className="text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light text-sm md:text-base tracking-wide">
            At Viewfinder Ace, we provide minimalist photography that celebrates the craft of storytelling through images. Every frame is composed with intention—embracing silence, contrast, and the poetry of light. Our work focuses on creating timeless visuals that capture emotion, detail, and authenticity with elegance.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative z-10 mx-auto max-w-4xl px-6 pb-32 text-center">
          <div className="rounded-none md:rounded-3xl glass border border-neutral-800/40 p-10 md:p-16 cinematic-shadow">
            <h3 className="font-title text-4xl md:text-5xl text-white tracking-widest uppercase font-semibold">Contact</h3>
            <p className="text-neutral-400 mt-4 text-sm tracking-wide uppercase">For collaborations or prints, reach out:</p>

            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="mailto:ace.viewfinder@gmail.com" className="w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-white hover:text-black hover:border-white text-neutral-300 px-8 py-3 transition-all duration-300 uppercase tracking-widest text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <Mail size={16} /> Email Us
              </a>
              <a href="tel:+919801635520" className="w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-white hover:text-black hover:border-white text-neutral-300 px-8 py-3 transition-all duration-300 uppercase tracking-widest text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <Phone size={16} /> +91 9801635520
              </a>
              <a href="https://www.instagram.com/viewfinder.ace?igsh=MTJscmt0b3ZvbDZ4dw==" target="_blank" rel="noreferrer" className="w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-white hover:text-black hover:border-white text-neutral-300 px-8 py-3 transition-all duration-300 uppercase tracking-widest text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <Instagram size={16} /> Instagram
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={showNext}
        onPrev={showPrev}
      />
    </div>
  );
}
