import Image from "next/image";
import type { ResolvedEvent } from "@/types/event";
import TodayBlock from "./TodayBlock";

interface Props {
  todayEvent: ResolvedEvent | null;
  locale: string;
}

const TAGLINES: Record<string, string> = {
  cs: "Pánský cruising bar.\nStředa až sobota.",
  en: "Men's cruising bar.\nWednesday through Saturday.",
};

export default function HeroBlock({ todayEvent, locale }: Props) {
  const tagline = TAGLINES[locale] ?? TAGLINES.en;

  return (
    <section className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/interior-wide.jpg"
          alt="Dark industrial bar interior with warm amber lighting and rows of bottles"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient: transparent top → opaque bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pb-16 md:px-12 md:pb-24 max-w-3xl">
        <p className="text-xs text-zinc-300 tracking-[0.35em] uppercase mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          Balbínova 3, Praha 2&nbsp;&nbsp;·&nbsp;&nbsp;Men only&nbsp;&nbsp;·&nbsp;&nbsp;18+
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-12 whitespace-pre-line">
          {tagline}
        </h1>
        <TodayBlock event={todayEvent} locale={locale} />
      </div>
    </section>
  );
}
