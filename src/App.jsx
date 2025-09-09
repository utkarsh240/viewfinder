import { useEffect, useMemo, useState, useCallback, useRef, useLayoutEffect } from 'react'
import { Camera, ChevronLeft, ChevronRight, X, Instagram, Mail, Phone } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const imageFiles = [
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
]

function toAltText(fileName) {
  return fileName
    .replace(/[_-]/g, ' ')
    .replace(/copy/gi, '')
    .replace(/enhanced/gi, '')
    .replace(/nr/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

gsap.registerPlugin(ScrollTrigger)

function App() {
  const rootRef = useRef(null)
  const images = useMemo(() => imageFiles.map((f) => ({
    src: `/portfolio/${f}`,
    alt: toAltText(f),
  })), [])

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const overlayRef = useRef(null)
  const lightboxImgRef = useRef(null)

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => {
    // animate out then close
    if (overlayRef.current && lightboxImgRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.2 },
        onComplete: () => setLightboxIndex(null),
      })
      tl.to(lightboxImgRef.current, { opacity: 0, scale: 0.97 })
        .to(overlayRef.current, { opacity: 0 }, '<')
      return
    }
    setLightboxIndex(null)
  }, [])
  const showPrev = useCallback((e) => {
    e?.stopPropagation?.()
    setLightboxIndex((i) => (i === null ? i : (i + images.length - 1) % images.length))
  }, [images.length])
  const showNext = useCallback((e) => {
    e?.stopPropagation?.()
    setLightboxIndex((i) => (i === null ? i : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeLightbox, showNext, showPrev])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header title
      gsap.from('.title-reveal', { opacity: 0, y: -10, duration: 0.6, ease: 'power2.out' })

      // Scroll reveals
      gsap.utils.toArray('.reveal').forEach((el, idx) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          delay: Math.min((idx % 9) * 0.03, 0.3),
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (lightboxIndex !== null && overlayRef.current && lightboxImgRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(lightboxImgRef.current, { opacity: 0, scale: 0.97 })
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.to(overlayRef.current, { opacity: 1, duration: 0.2 })
        .to(lightboxImgRef.current, { opacity: 1, scale: 1, duration: 0.25 }, '<')
    }
  }, [lightboxIndex])

  return (
    <div ref={rootRef} className="font-sans-body">
      {/* Header */}
      <header className="sticky top-0 z-40">
        <div className="glass border-b border-neutral-800/60">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              <nav className="hidden md:flex gap-6 text-sm text-neutral-300">
                <a href="#home" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1">Home</a>
                <a href="#portfolio" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1">Portfolio</a>
                <a href="#about" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1">About</a>
                <a href="#contact" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded px-1">Contact</a>
              </nav>
              <div className="text-center flex-1">
                <h1 className="title-reveal font-title text-3xl md:text-4xl tracking-wide text-white inline-flex items-center gap-2">
                  <span>Viewfinder</span>
                  <span className="title-gradient title-shimmer">Ace</span>
                </h1>
              </div>
              <div className="hidden md:flex items-center gap-4 text-neutral-300">
                <a href="#contact" className="hover:text-white" aria-label="Contact">
                  <Mail size={18} />
                </a>
                <a href="https://www.instagram.com/viewfinder.ace?igsh=MTJscmt0b3ZvbDZ4dw==" target="_blank" rel="noreferrer" className="hover:text-white" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            <div className="mt-3 md:hidden flex justify-center gap-6 text-sm text-neutral-300">
              <a href="#home" className="hover:text-white">Home</a>
              <a href="#portfolio" className="hover:text-white">Portfolio</a>
              <a href="#about" className="hover:text-white">About</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero / Home */}
      <section id="home" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-1 gap-10 items-center">
            <div className="reveal">
              <h2 className="gsap-hero text-4xl md:text-7xl font-semibold">
                <span className="gsap-green">Crafted</span> with intention, delivered with <span className="gsap-red">precision</span>.
              </h2>
              <p className="mt-4 text-neutral-300 max-w-prose">
              We provide a curated collection of photographs that explore light, motion, and quiet moments—crafted to transform memories into timeless visual narratives. Scroll to enter the gallery.
              </p>
              <div className="mt-6 flex items-center gap-3 text-neutral-400">
                <Camera className="opacity-80" size={18} />
                <span className="text-sm"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-neutral-800" />
          <Camera size={18} className="text-neutral-400" />
          <div className="h-px flex-1 bg-neutral-800" />
        </div>
        <h3 className="sr-only">Portfolio</h3>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {images.map((img, index) => (
            <button
              key={img.src}
              onClick={() => openLightbox(index)}
              className="reveal masonry-item avoid-break-inside group relative mb-4 md:mb-6 w-full rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 shadow-lg shadow-black/40"
            >
              {(() => {
                const base = img.src.replace(/\.(jpg|jpeg|png|webp)$/i, '')
                const webpSet = `${encodeURI(base + '-w1600.webp')} 1600w, ${encodeURI(base + '-w1024.webp')} 1024w, ${encodeURI(base + '-w640.webp')} 640w`
                const jpgSet = `${encodeURI(base + '-w1600.jpg')} 1600w, ${encodeURI(base + '-w1024.jpg')} 1024w, ${encodeURI(base + '-w640.jpg')} 640w`
                function handleImgError(e) {
                  // Fallback to original image if any variant 404s
                  const el = e.currentTarget
                  el.removeAttribute('srcset')
                  el.src = img.src
                }
                return (
                  <picture>
                    <source type="image/webp" srcSet={webpSet} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    <img
                      src={encodeURI(img.src)}
                      srcSet={jpgSet}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={handleImgError}
                    />
                  </picture>
                )
              })()}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-neutral-800/60" />
            </button>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-4xl px-4 py-14 md:py-20">
        <div className="reveal max-w-none">
          <h3 className="font-calligraphic text-3xl md:text-4xl text-white mb-4">About</h3>
          <p className="text-neutral-300 leading-relaxed">
          At Viewfinder Ace, we provide minimalist photography that celebrates the craft of storytelling through images. Every frame is composed with intention—embracing silence, contrast, and the poetry of light. Our work focuses on creating timeless visuals that capture emotion, detail, and authenticity with elegance.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <div className="reveal rounded-2xl glass border border-neutral-800/60 p-6 md:p-8">
          <h3 className="font-calligraphic text-3xl md:text-4xl text-white">Contact</h3>
          <p className="text-neutral-300 mt-3">For collaborations or prints, reach out:</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href="mailto:ace.viewfinder@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50" aria-label="Email">
              <Mail size={18} /> ace.viewfinder@gmail.com
            </a>
            <a href="tel:+919801635520" className="inline-flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50" aria-label="Phone">
              <Phone size={18} /> +91 9801635520
            </a>
            <a href="https://www.instagram.com/viewfinder.ace?igsh=MTJscmt0b3ZvbDZ4dw==" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50" aria-label="Instagram">
              <Instagram size={18} /> Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black/90"
          onClick={closeLightbox}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <img
              ref={lightboxImgRef}
              key={images[lightboxIndex].src}
              src={encodeURI(images[lightboxIndex].src)}
              alt={images[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl shadow-black/70 border border-neutral-800/60"
              loading="eager"
              decoding="async"
              onError={(e) => {
                const el = e.currentTarget
                el.src = encodeURI(images[lightboxIndex].src)
              }}
            />
          </div>
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <button onClick={(e) => { e.stopPropagation(); closeLightbox() }} aria-label="Close" className="rounded-full p-2 bg-neutral-800/60 hover:bg-neutral-700/60 text-white">
              <X />
            </button>
            <div className="hidden md:block text-neutral-300 text-sm">{images[lightboxIndex].alt}</div>
            <div className="w-9" />
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center p-4">
            <button onClick={(e) => { e.stopPropagation(); showPrev() }} aria-label="Previous" className="rounded-full p-2 bg-neutral-800/60 hover:bg-neutral-700/60 text-white">
              <ChevronLeft />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center p-4">
            <button onClick={(e) => { e.stopPropagation(); showNext() }} aria-label="Next" className="rounded-full p-2 bg-neutral-800/60 hover:bg-neutral-700/60 text-white">
              <ChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-800/60 py-8 text-center text-neutral-400">
        <div className="flex items-center justify-center gap-2">
          <Camera size={16} />
          <span>© {new Date().getFullYear()} Viewfinder Ace</span>
        </div>
      </footer>
    </div>
  )
}

export default App
