interface Props {
  locale: string;
}

const CONTENT: Record<string, Record<string, string>> = {
  cs: {
    address: "Balbínova 224/3, Praha 2",
    hours: "St–So",
    privateEvent: "Poptávka privátní akce",
    privacy: "Ochrana osobních údajů",
    legal: "HAPES s.r.o.",
  },
  en: {
    address: "Balbínova 224/3, Prague 2",
    hours: "Wed–Sat",
    privateEvent: "Private event enquiry",
    privacy: "Privacy policy",
    legal: "HAPES s.r.o.",
  },
};

export default function Footer({ locale }: Props) {
  const c = CONTENT[locale] ?? CONTENT.en;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-900 px-6 py-14 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
          {/* Identity */}
          <div className="space-y-1.5">
            <p className="font-bold tracking-widest text-sm">GARAGE</p>
            <p className="text-sm text-zinc-500">{c.address}</p>
            <p className="text-sm text-zinc-500">{c.hours}</p>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <a
              href="https://www.instagram.com/club_garageprague/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors"
            >
              Instagram
            </a>
          </div>

          {/* Private event */}
          <div>
            <a
              href={`/${locale}/contact#private-event`}
              className="text-xs text-zinc-500 hover:text-zinc-100 tracking-widest uppercase transition-colors"
            >
              {c.privateEvent}
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-6 border-t border-zinc-900">
          <p className="text-xs text-zinc-700">
            {c.legal} © {year}
            {process.env.NEXT_PUBLIC_APP_VERSION && (
              <span className="ml-3 text-zinc-800">v{process.env.NEXT_PUBLIC_APP_VERSION}</span>
            )}
          </p>
          <a
            href={`/${locale}/privacy`}
            className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors"
          >
            {c.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
