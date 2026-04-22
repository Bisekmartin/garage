import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventDefinitionBySlug, getNextDatesForSlug } from "@/lib/events";
import DressCodeBadge from "@/components/DressCodeBadge";
import PartnerCredit from "@/components/PartnerCredit";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEventDefinitionBySlug(slug);
  if (!event) return {};
  const title = locale === "en" ? event.title_en : event.title;
  return {
    title: `${title} — Club Garage Praha`,
    description: locale === "en" ? event.description_en : event.description_cs,
  };
}

const DAY_CS = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
const DAY_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LONG_CS = [
  "ledna", "února", "března", "dubna", "května", "června",
  "července", "srpna", "září", "října", "listopadu", "prosince",
];
const MONTH_LONG_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(dateStr: string, locale: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const dow = date.getDay();
  if (locale === "cs") {
    return `${DAY_CS[dow]} ${d}. ${MONTH_LONG_CS[m - 1]} ${y}`;
  }
  return `${DAY_EN[dow]}, ${MONTH_LONG_EN[m - 1]} ${d}, ${y}`;
}

const LABELS: Record<string, Record<string, string>> = {
  cs: {
    back: "← Zpět na akce",
    time: "Čas",
    entry: "Vstupné",
    free: "Zdarma",
    dresscode: "Dress code",
    description: "O akci",
    upcoming: "Příští termíny",
    address: "Místo",
    rules: "Pravidla vstupu",
    regular: "Regulární noc",
    themed: "Tematická párty",
    directions: "Trasa →",
  },
  en: {
    back: "← Back to events",
    time: "Time",
    entry: "Entry",
    free: "Free",
    dresscode: "Dress code",
    description: "About",
    upcoming: "Upcoming dates",
    address: "Location",
    rules: "House rules",
    regular: "Regular night",
    themed: "Themed party",
    directions: "Directions →",
  },
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const event = getEventDefinitionBySlug(slug);
  if (!event) notFound();

  const l = LABELS[locale] ?? LABELS.en;
  const title = locale === "en" ? event.title_en : event.title;
  const description = locale === "en" ? event.description_en : event.description_cs;

  const entryFee =
    event.price.amount === 0 ? l.free : `${event.price.amount} ${event.price.currency}`;

  // Upcoming dates (for regular: next 4 occurrences; for themed: all defined dates)
  const now = new Date();
  const upcomingDates =
    event.type === "regular"
      ? getNextDatesForSlug(slug, now, 4)
      : (event.dates ?? []).filter((d) => new Date(d) >= now);

  const heroImage = event.poster ?? "/images/event-fallback/bar.jpg";

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/10" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-12">
          <span className="text-xs text-zinc-400 tracking-widest uppercase">
            {event.type === "themed" ? l.themed : l.regular}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-1">{title}</h1>
        </div>
      </section>

      {/* Content */}
      <main className="px-6 md:px-12 py-12 max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href={`/${locale}/events`}
          className="text-xs text-zinc-500 hover:text-zinc-300 tracking-widest uppercase transition-colors"
        >
          {l.back}
        </Link>

        {/* Meta grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {/* Dates */}
          <div>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">{upcomingDates.length > 1 ? l.upcoming : "Datum"}</p>
            <div className="space-y-1">
              {upcomingDates.map((d) => (
                <p key={d} className="text-zinc-100">{formatDate(d, locale)}</p>
              ))}
              {upcomingDates.length === 0 && (
                <p className="text-zinc-500">—</p>
              )}
            </div>
          </div>

          {/* Time */}
          <div>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">{l.time}</p>
            <p className="text-zinc-100 tabular-nums">
              {event.start_time} — {event.end_time}
            </p>
          </div>

          {/* Entry */}
          <div>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">{l.entry}</p>
            <p className="text-zinc-100">{entryFee}</p>
          </div>

          {/* Dress code */}
          <div>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">{l.dresscode}</p>
            <DressCodeBadge dresscode={event.dresscode} locale={locale} />
            {event.dresscode.mode === "strict" && event.dresscode.allowed.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-zinc-500 mb-1">
                  {locale === "cs" ? "Povoleno:" : "Allowed:"}
                </p>
                <p className="text-xs text-zinc-400">{event.dresscode.allowed.join(", ")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="mt-10 border-t border-zinc-900 pt-8">
            <p className="text-xs text-zinc-500 tracking-widest uppercase mb-4">{l.description}</p>
            <p className="text-zinc-300 leading-relaxed">{description}</p>
          </div>
        )}

        {/* Partner */}
        {event.partner && (
          <div className="mt-8">
            <PartnerCredit partner={event.partner} locale={locale} />
          </div>
        )}

        {/* Presale CTA */}
        {event.partner?.presale_url && (
          <div className="mt-6">
            <a
              href={event.partner.presale_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-dark text-white text-xs font-medium tracking-widest uppercase px-6 py-3.5 transition-colors"
            >
              {locale === "cs" ? "Koupit předprodej" : "Buy presale ticket"}
            </a>
          </div>
        )}

        {/* Location */}
        <div className="mt-10 border-t border-zinc-900 pt-8">
          <p className="text-xs text-zinc-500 tracking-widest uppercase mb-2">{l.address}</p>
          <p className="text-zinc-100">Club Garage</p>
          <p className="text-zinc-400 text-sm">Balbínova 224/3, Praha 2</p>
          <a
            href="https://maps.google.com/?q=Balbínova+224/3,+Praha+2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs text-zinc-500 hover:text-zinc-300 tracking-widest uppercase transition-colors"
          >
            {l.directions}
          </a>
        </div>

        {/* Rules */}
        <div className="mt-8">
          <Link
            href={`/${locale}/rules`}
            className="text-xs text-zinc-500 hover:text-zinc-300 tracking-widest uppercase transition-colors"
          >
            {l.rules} →
          </Link>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
