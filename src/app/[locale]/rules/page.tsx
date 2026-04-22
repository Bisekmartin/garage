import type { Metadata } from "next";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "cs" ? "Pravidla vstupu — Club Garage Praha" : "House Rules — Club Garage Praha",
    description:
      locale === "cs"
        ? "Podmínky vstupu a pravidla chování v Club Garage Praha."
        : "Entry conditions and code of conduct at Club Garage Praha.",
  };
}

const CONTENT = {
  cs: {
    heading: "Pravidla vstupu",
    intro: "Club Garage je prostor jen pro muže. Vstupem souhlasíš s níže uvedenými podmínkami.",
    sections: [
      {
        label: "Vstup",
        rules: [
          "Vstup pouze pro muže starší 18 let.",
          "Vyhrazujeme si právo odepřít vstup bez udání důvodu.",
          "Na vyžádání prokáže se platným dokladem totožnosti.",
          "Vstupné je nevratné.",
        ],
      },
      {
        label: "Dress code",
        rules: [
          "V době regulárních nocí je dress code volný — základní hygiena je samozřejmostí.",
          "Tematické párty mají vlastní dress code uvedený u každé akce.",
          "Přísný dress code: fetish a kink oblečení, uniformy, kůže, latex, sportovní oblečení, spodní prádlo.",
          "Street wear (džíny, mikiny, košile) je na tematických akcích s přísným dress codem zakázán.",
        ],
      },
      {
        label: "Chování",
        rules: [
          "Respektuj ostatní hosty — souhlas je základ.",
          "Fotografování a natáčení je zakázáno.",
          "Násilí, obtěžování a diskriminace vedou k okamžitému vykázání.",
          "Obsluha má právo odmítnout dalšímu servírování.",
        ],
      },
      {
        label: "Provoz",
        rules: [
          "Šatna je k dispozici za symbolický poplatek.",
          "Ztrátu věcí v šatně bar nehradí.",
          "Vlastní alkohol do prostor není povolen.",
        ],
      },
    ],
  },
  en: {
    heading: "House Rules",
    intro: "Club Garage is a men-only space. By entering you agree to the following conditions.",
    sections: [
      {
        label: "Entry",
        rules: [
          "Entry for men aged 18 and over only.",
          "We reserve the right to refuse entry without explanation.",
          "Valid photo ID may be requested at the door.",
          "Entry fees are non-refundable.",
        ],
      },
      {
        label: "Dress code",
        rules: [
          "Regular nights have an open dress code — basic hygiene is expected.",
          "Themed parties have their own dress code listed on each event page.",
          "Strict dress code: fetish and kink gear, uniforms, leather, latex, sportswear, underwear.",
          "Street wear (jeans, hoodies, shirts) is not permitted at strict dress code events.",
        ],
      },
      {
        label: "Conduct",
        rules: [
          "Respect other guests — consent is the foundation.",
          "Photography and filming are strictly prohibited.",
          "Violence, harassment, and discrimination result in immediate removal.",
          "Staff may refuse further service at their discretion.",
        ],
      },
      {
        label: "Operations",
        rules: [
          "Cloakroom available for a small fee.",
          "The bar is not liable for items lost in the cloakroom.",
          "Outside alcohol is not permitted on the premises.",
        ],
      },
    ],
  },
};

export default async function RulesPage({
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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{c.heading}</h1>
          <p className="text-zinc-400 leading-relaxed mb-14">{c.intro}</p>

          <div className="space-y-12">
            {c.sections.map((section) => (
              <div key={section.label}>
                <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-4">{section.label}</p>
                <ul className="space-y-3">
                  {section.rules.map((rule) => (
                    <li key={rule} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                      <span className="shrink-0 text-accent mt-0.5">—</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
