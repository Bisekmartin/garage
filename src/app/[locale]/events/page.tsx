import type { Metadata } from "next";
import { getUpcomingEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import MonthFilter from "@/components/MonthFilter";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "cs" ? "Akce — Club Garage Praha" : "Events — Club Garage Praha",
    description:
      locale === "cs"
        ? "Kalendář akcí Club Garage Praha. Regulární noci i tematické párty."
        : "Club Garage Praha event calendar. Regular nights and themed parties.",
  };
}

function getMonthsInRange(from: Date, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from.getFullYear(), from.getMonth() + i, 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
}

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ m?: string }>;
}) {
  const { locale } = await params;
  const { m } = await searchParams;

  const now = new Date();
  const months = getMonthsInRange(now, 3);
  const selected = m && months.includes(m) ? m : months[0];

  // Fetch events for the full 3-month range, then filter client-side
  const allEvents = getUpcomingEvents(now, 92);
  const filtered = allEvents.filter((e) => e.date.startsWith(selected));

  const TITLES: Record<string, Record<string, string>> = {
    cs: { heading: "Akce", empty: "V tomto měsíci žádné akce." },
    en: { heading: "Events", empty: "No events this month." },
  };
  const t = TITLES[locale] ?? TITLES.en;

  const NEWSLETTER: Record<string, Record<string, string>> = {
    cs: { heading: "Newsletter", sub: "Nové akce, žádný spam.", placeholder: "váš@email.cz", btn: "→" },
    en: { heading: "Newsletter", sub: "New events, no spam.", placeholder: "your@email.com", btn: "→" },
  };
  const nl = NEWSLETTER[locale] ?? NEWSLETTER.en;

  return (
    <>
      <main className="pt-28 pb-16 px-6 md:px-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">{t.heading}</h1>

          {/* Month filter */}
          <MonthFilter months={months} selected={selected} locale={locale} />

          {/* Event list */}
          {filtered.length === 0 ? (
            <p className="text-zinc-500 py-8">{t.empty}</p>
          ) : (
            <div>
              {filtered.map((event) => (
                <EventCard key={`${event.slug}-${event.date}`} event={event} locale={locale} />
              ))}
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-20 border-t border-zinc-900 pt-12">
            <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-1">{nl.heading}</p>
            <p className="text-zinc-300 mb-6">{nl.sub}</p>
            {/* [DRAFT — napojit na backend / email provider] */}
            <form className="flex gap-3 max-w-sm">
              <input
                type="email"
                placeholder={nl.placeholder}
                className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 text-sm font-medium transition-colors"
              >
                {nl.btn}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
