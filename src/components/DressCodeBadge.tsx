import type { Dresscode } from "@/types/event";

const LABELS: Record<string, Record<string, string>> = {
  cs: { none: "Bez dress codu", suggested: "Doporučeno", strict: "Povinné" },
  en: { none: "No dress code", suggested: "Recommended", strict: "Required" },
};

const STYLES: Record<string, string> = {
  none: "text-zinc-600",
  suggested: "text-zinc-400 border border-zinc-700 px-2 py-0.5",
  strict: "text-accent border border-accent/50 px-2 py-0.5",
};

interface Props {
  dresscode: Dresscode;
  locale: string;
}

export default function DressCodeBadge({ dresscode, locale }: Props) {
  const labels = LABELS[locale] ?? LABELS.en;
  const label = labels[dresscode.mode];
  const style = STYLES[dresscode.mode];
  const items = dresscode.items;

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs tracking-wider uppercase ${style}`}>
      <span>{label}</span>
      {items.length > 0 && (
        <>
          <span className="text-zinc-700">·</span>
          <span className="normal-case tracking-normal">{items.join(", ")}</span>
        </>
      )}
    </span>
  );
}
