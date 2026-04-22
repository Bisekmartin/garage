import Link from "next/link";
import type { ResolvedEvent } from "@/types/event";
import DressCodeBadge from "./DressCodeBadge";

interface Props {
  event: ResolvedEvent | null;
  locale: string;
}

const LABELS: Record<string, Record<string, string>> = {
  cs: { label: "Co je dnes", closed: "Dnes zavřeno" },
  en: { label: "On tonight", closed: "Closed tonight" },
};

export default function TodayBlock({ event, locale }: Props) {
  const l = LABELS[locale] ?? LABELS.en;
  const title = event ? (locale === "en" ? event.title_en : event.title) : null;

  return (
    <div className="border-l-2 border-accent pl-5">
      <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-2">{l.label}</p>

      {event ? (
        <Link href={`/${locale}/events/${event.slug}`} className="group block">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-accent transition-colors">
            {title}
          </h2>
          <p className="text-zinc-300 text-sm mt-1 tabular-nums">
            {event.start_time} — {event.end_time}
          </p>
          <div className="mt-3">
            <DressCodeBadge dresscode={event.dresscode} locale={locale} />
          </div>
        </Link>
      ) : (
        <p className="text-zinc-400 text-lg">{l.closed}</p>
      )}
    </div>
  );
}
