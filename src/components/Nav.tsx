"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface NavProps {
  locale: string;
}

export default function Nav({ locale }: NavProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const alt = locale === "cs" ? "en" : "cs";

  const links = [
    { href: `/${locale}/events`, label: t("events") },
    { href: `/${locale}/drinks`, label: t("drinks") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Gradient so nav is readable over hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/80 to-transparent pointer-events-none" />

      <nav
        className="relative flex items-center justify-between px-6 py-5 md:px-10"
        aria-label="Main navigation"
      >
        <Link href={`/${locale}`} className="text-lg font-bold tracking-widest">
          GARAGE
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`/${alt}`}
            className="text-xs text-zinc-600 hover:text-zinc-300 tracking-widest uppercase border border-zinc-800 hover:border-zinc-600 px-2.5 py-1 transition-colors"
          >
            {alt.toUpperCase()}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={t("toggleMenu")}
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span
            className={`block w-6 h-px bg-zinc-400 transition-all origin-center ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-zinc-400 transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px bg-zinc-400 transition-all origin-center ${
              open ? "w-6 -rotate-45 -translate-y-[7px]" : "w-4"
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="relative md:hidden bg-bg border-t border-zinc-900 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-300 hover:text-white tracking-widest uppercase transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`/${alt}`}
            onClick={() => setOpen(false)}
            className="text-xs text-zinc-600 hover:text-zinc-400 tracking-widest uppercase transition-colors self-start mt-2"
          >
            {alt.toUpperCase()}
          </Link>
        </div>
      )}
    </header>
  );
}
