import type { ResolvedEvent } from "@/types/event";
import EventCard from "./EventCard";

interface Props {
  events: ResolvedEvent[];
  locale: string;
}

const TITLES: Record<string, string> = {
  cs: "Nadcházející akce",
  en: "Upcoming events",
};

export default function EventList({ events, locale }: Props) {
  const title = TITLES[locale] ?? TITLES.en;

  return (
    <section className="px-6 py-16 md:px-12 max-w-3xl mx-auto">
      <h2 className="text-xs text-zinc-600 tracking-[0.35em] uppercase mb-8">{title}</h2>
      {events.length === 0 ? (
        <p className="text-zinc-700">—</p>
      ) : (
        <div>
          {events.map((event) => (
            <EventCard key={`${event.slug}-${event.date}`} event={event} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
