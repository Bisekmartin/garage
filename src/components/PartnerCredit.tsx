import type { Partner } from "@/types/event";

const LABELS: Record<string, Record<string, string>> = {
  cs: { by: "Pořádá", presale: "Předprodej →" },
  en: { by: "Hosted by", presale: "Presale →" },
};

interface Props {
  partner: Partner;
  locale: string;
}

export default function PartnerCredit({ partner, locale }: Props) {
  const l = LABELS[locale] ?? LABELS.en;

  return (
    <span className="inline-flex items-center gap-2 text-xs text-zinc-500">
      <span>{l.by}</span>
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-zinc-100 underline underline-offset-2 transition-colors"
      >
        {partner.name}
      </a>
      {partner.presale_url && (
        <>
          <span className="text-zinc-700">·</span>
          <a
            href={partner.presale_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dark transition-colors"
          >
            {l.presale}
          </a>
        </>
      )}
    </span>
  );
}
