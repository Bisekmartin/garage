import type { Metadata } from "next";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "cs" ? "Nápoje — Club Garage Praha" : "Drinks — Club Garage Praha",
    description:
      locale === "cs"
        ? "Nápojový lístek Club Garage Praha. Pivo, destiláty, koktejly, panáky."
        : "Drink menu at Club Garage Praha. Beer, spirits, cocktails, shots.",
  };
}

const MENU = {
  cs: {
    heading: "Nápoje",
    note: "Ceny v CZK. Nabídka se může měnit.",
    categories: [
      {
        label: "Pivo",
        items: [
          { name: "Kozel 11° (0,5 l)", price: "60 Kč" },
          { name: "Kozel tmavý 10° (0,5 l)", price: "60 Kč" },
          { name: "Kozel nealkoholický (0,5 l)", price: "55 Kč" },
        ],
      },
      {
        label: "Panáky",
        items: [
          { name: "Vodka (4 cl)", price: "80 Kč" },
          { name: "Rum (4 cl)", price: "80 Kč" },
          { name: "Whisky (4 cl)", price: "90 Kč" },
          { name: "Gin (4 cl)", price: "90 Kč" },
          { name: "Tequila (4 cl)", price: "90 Kč" },
          { name: "Jägermeister (4 cl)", price: "80 Kč" },
        ],
      },
      {
        label: "Destiláty",
        items: [
          { name: "Becherovka (4 cl)", price: "80 Kč" },
          { name: "Fernet Stock (4 cl)", price: "80 Kč" },
          { name: "Metaxa 5* (4 cl)", price: "90 Kč" },
          { name: "Amaretto (4 cl)", price: "90 Kč" },
          { name: "Baileys (4 cl)", price: "90 Kč" },
        ],
      },
      {
        label: "Koktejly",
        items: [
          { name: "Gin Tonic", price: "130 Kč" },
          { name: "Vodka Tonic", price: "120 Kč" },
          { name: "Cuba Libre", price: "120 Kč" },
          { name: "Moscow Mule", price: "130 Kč" },
          { name: "Aperol Spritz", price: "130 Kč" },
        ],
      },
      {
        label: "Nealko",
        items: [
          { name: "Coca-Cola (0,33 l)", price: "55 Kč" },
          { name: "Tonic Fever-Tree (0,2 l)", price: "55 Kč" },
          { name: "Džus (0,2 l)", price: "45 Kč" },
          { name: "Voda (0,5 l)", price: "40 Kč" },
          { name: "Red Bull (0,25 l)", price: "75 Kč" },
        ],
      },
    ],
  },
  en: {
    heading: "Drinks",
    note: "Prices in CZK. Menu subject to change.",
    categories: [
      {
        label: "Beer",
        items: [
          { name: "Kozel 11° (500 ml)", price: "60 CZK" },
          { name: "Kozel Dark 10° (500 ml)", price: "60 CZK" },
          { name: "Kozel Non-alcoholic (500 ml)", price: "55 CZK" },
        ],
      },
      {
        label: "Shots",
        items: [
          { name: "Vodka (4 cl)", price: "80 CZK" },
          { name: "Rum (4 cl)", price: "80 CZK" },
          { name: "Whisky (4 cl)", price: "90 CZK" },
          { name: "Gin (4 cl)", price: "90 CZK" },
          { name: "Tequila (4 cl)", price: "90 CZK" },
          { name: "Jägermeister (4 cl)", price: "80 CZK" },
        ],
      },
      {
        label: "Spirits",
        items: [
          { name: "Becherovka (4 cl)", price: "80 CZK" },
          { name: "Fernet Stock (4 cl)", price: "80 CZK" },
          { name: "Metaxa 5* (4 cl)", price: "90 CZK" },
          { name: "Amaretto (4 cl)", price: "90 CZK" },
          { name: "Baileys (4 cl)", price: "90 CZK" },
        ],
      },
      {
        label: "Cocktails",
        items: [
          { name: "Gin Tonic", price: "130 CZK" },
          { name: "Vodka Tonic", price: "120 CZK" },
          { name: "Cuba Libre", price: "120 CZK" },
          { name: "Moscow Mule", price: "130 CZK" },
          { name: "Aperol Spritz", price: "130 CZK" },
        ],
      },
      {
        label: "Non-alcoholic",
        items: [
          { name: "Coca-Cola (330 ml)", price: "55 CZK" },
          { name: "Fever-Tree Tonic (200 ml)", price: "55 CZK" },
          { name: "Juice (200 ml)", price: "45 CZK" },
          { name: "Water (500 ml)", price: "40 CZK" },
          { name: "Red Bull (250 ml)", price: "75 CZK" },
        ],
      },
    ],
  },
};

export default async function DrinksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = MENU[locale as "cs" | "en"] ?? MENU.en;

  return (
    <>
      <main className="pt-28 pb-16 px-6 md:px-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{c.heading}</h1>
          <p className="text-xs text-zinc-500 tracking-widest uppercase mb-14">{c.note}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {c.categories.map((cat) => (
              <div key={cat.label}>
                <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-4">{cat.label}</p>
                <div className="space-y-2">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex justify-between gap-6 text-sm">
                      <span className="text-zinc-300">{item.name}</span>
                      <span className="text-zinc-100 tabular-nums shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
