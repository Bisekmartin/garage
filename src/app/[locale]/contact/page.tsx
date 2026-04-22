import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "cs" ? "Kontakt — Club Garage Praha" : "Contact — Club Garage Praha",
    description:
      locale === "cs"
        ? "Adresa, jak se dostat a poptávka privátní akce — Club Garage Praha."
        : "Address, directions, and private event enquiry — Club Garage Praha.",
  };
}

const CONTENT = {
  cs: {
    heading: "Kontakt",
    addressLabel: "Adresa",
    address: "Balbínova 224/3\nPraha 2 — Vinohrady",
    hoursLabel: "Otevírací doba",
    hours: [
      { day: "Středa", time: "19:00 – 03:00" },
      { day: "Čtvrtek", time: "21:00 – 05:00" },
      { day: "Pátek", time: "21:00 – 06:00" },
      { day: "Sobota", time: "21:00 – 06:00" },
    ],
    directionsLabel: "Jak se dostat",
    directions: [
      { icon: "M", line: "Metro Muzeum (A, C)", walk: "~10 minut pěšky" },
      { icon: "C", line: "Metro I.P. Pavlova (C)", walk: "~7 minut pěšky" },
      { icon: "T", line: "Tram Náměstí Míru", walk: "~5 minut pěšky" },
    ],
    mapsLink: "Otevřít v Google Maps",
    privateLabel: "Poptávka privátní akce",
    privateDesc:
      "Zájem o pronájem prostoru pro uzavřenou skupinu? Napište nám — upřesníme kapacitu, podmínky a datum.",
    form: {
      name: "Jméno",
      email: "E-mail",
      date: "Preferovaný termín",
      size: "Velikost skupiny",
      message: "Zpráva",
      submit: "Odeslat poptávku",
      success: "Poptávka odeslána — ozveme se co nejdříve.",
      error: "Něco se pokazilo. Zkuste to prosím znovu.",
    },
    social: "Sociální sítě",
  },
  en: {
    heading: "Contact",
    addressLabel: "Address",
    address: "Balbínova 224/3\nPrague 2 — Vinohrady",
    hoursLabel: "Opening hours",
    hours: [
      { day: "Wednesday", time: "7 pm – 3 am" },
      { day: "Thursday", time: "9 pm – 5 am" },
      { day: "Friday", time: "9 pm – 6 am" },
      { day: "Saturday", time: "9 pm – 6 am" },
    ],
    directionsLabel: "Getting here",
    directions: [
      { icon: "M", line: "Metro Muzeum (A, C)", walk: "~10 min walk" },
      { icon: "C", line: "Metro I.P. Pavlova (C)", walk: "~7 min walk" },
      { icon: "T", line: "Tram Náměstí Míru", walk: "~5 min walk" },
    ],
    mapsLink: "Open in Google Maps",
    privateLabel: "Private event enquiry",
    privateDesc:
      "Interested in renting the space for a private group? Get in touch — we'll discuss capacity, conditions and availability.",
    form: {
      name: "Name",
      email: "Email",
      date: "Preferred date",
      size: "Group size",
      message: "Message",
      submit: "Send enquiry",
      success: "Enquiry sent — we'll get back to you shortly.",
      error: "Something went wrong. Please try again.",
    },
    social: "Social",
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = CONTENT[locale as "cs" | "en"] ?? CONTENT.en;

  return (
    <>
      <main className="pt-28 pb-16 px-6 md:px-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-14">{c.heading}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Left column — info */}
            <div className="space-y-10">
              {/* Address */}
              <div>
                <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-3">{c.addressLabel}</p>
                <p className="text-zinc-100 whitespace-pre-line leading-relaxed">{c.address}</p>
                <a
                  href="https://maps.google.com/?q=Balbínova+224/3,+Praha+2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs text-zinc-500 hover:text-zinc-300 tracking-widest uppercase transition-colors"
                >
                  {c.mapsLink} →
                </a>
              </div>

              {/* Opening hours */}
              <div>
                <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-3">{c.hoursLabel}</p>
                <div className="space-y-1.5">
                  {c.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-6 text-sm">
                      <span className="text-zinc-400">{h.day}</span>
                      <span className="text-zinc-100 tabular-nums">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Directions */}
              <div>
                <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-3">{c.directionsLabel}</p>
                <div className="space-y-3">
                  {c.directions.map((d) => (
                    <div key={d.line} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold flex items-center justify-center">
                        {d.icon}
                      </span>
                      <div>
                        <p className="text-sm text-zinc-200">{d.line}</p>
                        <p className="text-xs text-zinc-500">{d.walk}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-3">{c.social}</p>
                <div className="flex gap-6">
                  <a
                    href="https://www.instagram.com/club_garageprague/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Right column — private event form */}
            <div id="private-event">
              <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-3">{c.privateLabel}</p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8">{c.privateDesc}</p>

              <ContactForm labels={c.form} />
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
