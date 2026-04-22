import type { Metadata } from "next";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "cs" ? "O nás — Club Garage Praha" : "About — Club Garage Praha",
    description:
      locale === "cs"
        ? "Club Garage Praha — pánský cruising a fetish bar na Vinohradech od roku 2002."
        : "Club Garage Praha — men's cruising and fetish bar in Vinohrady since 2002.",
  };
}

const CONTENT = {
  cs: {
    heading: "O nás",
    sections: [
      {
        label: "Místo",
        body: "Club Garage sídlí v suterénu historického domu na Balbínově ulici ve Vinohradech — čtvrti, která Praze vždy dávala trochu víc než zbytek. Industriální stropy, kožené lavice, červené neonky. Žádná póza, jen prostor.",
      },
      {
        label: "Kdo jsme",
        body: "Jsme pánský cruising bar otevřený od středy do soboty. Naším hostem je každý muž, který ví, proč přišel. Tematické párty, fetish noci, after-work posezení — každý večer má svůj charakter.",
      },
      {
        label: "Pravidla hry",
        body: "Respekt a souhlas nejsou volitelné — jsou základ. Fotografování je zakázáno. Dress code na tematických akcích bereme vážně. Zbytek je na tobě.",
      },
    ],
  },
  en: {
    heading: "About",
    sections: [
      {
        label: "The space",
        body: "Club Garage is in the basement of a historic building on Balbínova street in Vinohrady — a neighbourhood that has always given Prague a little more than the rest. Industrial ceilings, leather banquettes, red neon. No pretence, just space.",
      },
      {
        label: "Who we are",
        body: "We're a men-only cruising bar open Wednesday through Saturday. Our guests are men who know why they came. Themed parties, fetish nights, after-work drinks — every evening has its own character.",
      },
      {
        label: "The rules",
        body: "Respect and consent aren't optional — they're the foundation. Photography is prohibited. Dress codes at themed events are taken seriously. The rest is up to you.",
      },
    ],
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = CONTENT[locale as "cs" | "en"] ?? CONTENT.en;

  return (
    <>
      <main className="pt-28 pb-16 px-6 md:px-12 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-14">{c.heading}</h1>

          <div className="space-y-12">
            {c.sections.map((section) => (
              <div key={section.label}>
                <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-3">{section.label}</p>
                <p className="text-zinc-300 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
