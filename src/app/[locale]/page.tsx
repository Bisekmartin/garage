import type { Metadata } from "next";
import HeroBlock from "@/components/HeroBlock";
import EventList from "@/components/EventList";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getUpcomingEvents, getTodayEvent } from "@/lib/events";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tagline =
    locale === "cs"
      ? "Pánský cruising bar v centru Prahy. Středa až sobota."
      : "Men's cruising bar in central Prague. Wednesday through Saturday.";

  return {
    title: "Club Garage Praha — Gay Cruising Bar",
    description: tagline,
    openGraph: {
      title: "Club Garage Praha",
      description: tagline,
      locale: locale === "cs" ? "cs_CZ" : "en_US",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const now = new Date();
  const todayEvent = getTodayEvent(now);
  const upcoming = getUpcomingEvents(now, 35);

  const nightclubLd = {
    "@context": "https://schema.org",
    "@type": "NightClub",
    name: "Club Garage Praha",
    url: "https://club-garage-prag.cz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Balbínova 224/3",
      addressLocality: "Praha 2",
      addressRegion: "Vinohrady",
      postalCode: "120 00",
      addressCountry: "CZ",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "19:00", closes: "03:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "21:00", closes: "05:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "21:00", closes: "06:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "21:00", closes: "06:00" },
    ],
    sameAs: ["https://www.instagram.com/club_garageprague/"],
  };

  return (
    <>
      <JsonLd data={nightclubLd} />
      <HeroBlock todayEvent={todayEvent} locale={locale} />
      <EventList events={upcoming.slice(0, 10)} locale={locale} />
      <Gallery locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
