import Link from "next/link";

interface Props {
  months: string[];
  selected: string;
  locale: string;
}

const MONTH_CS = ["Led", "Úno", "Bře", "Dub", "Kvě", "Čvn", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro"];
const MONTH_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthLabel(monthStr: string, locale: string): string {
  const [year, m] = monthStr.split("-").map(Number);
  const names = locale === "cs" ? MONTH_CS : MONTH_EN;
  return `${names[m - 1]} ${year}`;
}

export default function MonthFilter({ months, selected, locale }: Props) {
  const base = `/${locale}/events`;

  return (
    <div className="flex gap-3 flex-wrap mb-10">
      {months.map((m) => (
        <Link
          key={m}
          href={`${base}?m=${m}`}
          className={`text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors ${
            m === selected
              ? "border-accent text-accent"
              : "border-zinc-700 text-zinc-400 hover:border-zinc-400 hover:text-zinc-200"
          }`}
        >
          {monthLabel(m, locale)}
        </Link>
      ))}
    </div>
  );
}
