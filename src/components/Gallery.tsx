"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt_cs: string;
  alt_en: string;
}

const IMAGES: GalleryImage[] = [
  {
    src: "/images/gallery/men-only.jpg",
    alt_cs: "Červený neonový nápis MEN ONLY na cihlové zdi",
    alt_en: "Red neon sign MEN ONLY on brick wall",
  },
  {
    src: "/images/gallery/lounge.jpg",
    alt_cs: "Kožená lavice u betonové zdi s industriální lampou a svíčkou",
    alt_en: "Leather banquette against a concrete wall with industrial lamp and candle",
  },
  {
    src: "/images/gallery/bar-counter.jpg",
    alt_cs: "Barový pult s řadami lahví při tlumeném červeném světle",
    alt_en: "Bar counter with rows of bottles in dim red light",
  },
  {
    src: "/images/gallery/beer.jpg",
    alt_cs: "Půllitr tmavého piva při teplém protisvětle",
    alt_en: "Pint of dark beer under warm backlight",
  },
  {
    src: "/images/gallery/chain.jpg",
    alt_cs: "Detail rezavého řetězu na potrhaném černém kůže",
    alt_en: "Close-up of a rusty chain on worn black leather",
  },
  {
    src: "/images/gallery/watch.jpg",
    alt_cs: "Hodinky a hořící cigareta na tmavém povrchu",
    alt_en: "Watch and lit cigarette on a dark surface",
  },
];

interface Props {
  locale: string;
}

export default function Gallery({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + IMAGES.length) % IMAGES.length),
    []
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % IMAGES.length),
    []
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function openAt(index: number) {
    setCurrent(index);
    setOpen(true);
  }

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    setTouchStart(null);
  }

  const img = IMAGES[current];
  const alt = locale === "cs" ? img.alt_cs : img.alt_en;

  const TITLE = { cs: "Atmosféra", en: "Atmosphere" };

  return (
    <section className="px-6 py-16 md:px-12 max-w-3xl mx-auto">
      <h2 className="text-xs text-zinc-400 tracking-[0.35em] uppercase mb-8">
        {TITLE[locale as "cs" | "en"] ?? TITLE.en}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
        {IMAGES.map((image, i) => (
          <button
            key={image.src}
            onClick={() => openAt(i)}
            className="relative aspect-square overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={locale === "cs" ? image.alt_cs : image.alt_en}
          >
            <Image
              src={image.src}
              alt={locale === "cs" ? image.alt_cs : image.alt_en}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Image container */}
          <div
            className="relative"
            style={{ width: "90vw", height: "85vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={img.src}
              alt={alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Counter */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-zinc-500 tabular-nums tracking-widest">
            {current + 1} / {IMAGES.length}
          </p>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-3 transition-colors"
            aria-label={locale === "cs" ? "Předchozí" : "Previous"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-3 transition-colors"
            aria-label={locale === "cs" ? "Další" : "Next"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 transition-colors"
            aria-label={locale === "cs" ? "Zavřít" : "Close"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
