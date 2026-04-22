import type { ResolvedEvent } from "@/types/event";
import DressCodeBadge from "./DressCodeBadge";
import PartnerCredit from "./PartnerCredit";

interface Props {
  event: ResolvedEvent;
  locale: string;
}

const DAY_CS = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
const DAY_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_CS = ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"];
const MONTH_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function EventCard({ event, locale }: Props) {
  const [year, month, day] = event.date.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dow = date.getDay();

  const dayLabel = locale === "cs" ? DAY_CS[dow] : DAY_EN[dow];
  const monthLabel = locale === "cs" ? MONTH_CS[month - 1] : MONTH_EN[month - 1];
  const title = locale === "en" ? event.title_en : event.title;

  const entryFee =
    event.price.amount === 0
      ? locale === "cs"
        ? "Zdarma"
        : "Free"
      : `${event.price.amount} ${event.price.currency}`;

  return (
    <article className="border-b border-zinc-900 py-5">
      <div className="flex gap-5 md:gap-8">
        {/* Date column */}
        <div className="w-12 md:w-14 shrink-0 text-center pt-0.5">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">{dayLabel}</p>
          <p className="text-2xl font-bold tabular-nums leading-tight mt-0.5">{day}</p>
          <p className="text-xs text-zinc-600 uppercase tracking-widest mt-0.5">{monthLabel}</p>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3
                className={`font-bold text-base md:text-lg leading-tight ${
                  event.type === "themed" ? "text-accent" : ""
                }`}
              >
                {title}
              </h3>
              <p className="text-zinc-500 text-sm mt-0.5 tabular-nums">
                {event.start_time} — {event.end_time}
              </p>
            </div>
            <p className="text-sm text-zinc-500 tabular-nums shrink-0">{entryFee}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <DressCodeBadge dresscode={event.dresscode} locale={locale} />
            {event.partner && <PartnerCredit partner={event.partner} locale={locale} />}
          </div>
        </div>
      </div>
    </article>
  );
}
