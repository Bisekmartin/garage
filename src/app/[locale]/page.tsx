import type { Metadata } from "next";
import HeroBlock from "@/components/HeroBlock";
import EventList from "@/components/EventList";
import Footer from "@/components/Footer";
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

  return (
    <>
      <HeroBlock todayEvent={todayEvent} locale={locale} />
      <EventList events={upcoming.slice(0, 10)} locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
