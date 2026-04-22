import type { MetadataRoute } from "next";
import { getAllEventSlugs } from "@/lib/events";

const BASE = "https://club-garage-prag.cz";
const LOCALES = ["cs", "en"] as const;

function url(path: string, priority: number, changefreq: MetadataRoute.Sitemap[0]["changeFrequency"]): MetadataRoute.Sitemap[0] {
  return { url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: changefreq, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = LOCALES.flatMap((locale) => [
    url(`/${locale}`, 1.0, "daily"),
    url(`/${locale}/events`, 0.9, "daily"),
    url(`/${locale}/drinks`, 0.6, "monthly"),
    url(`/${locale}/about`, 0.5, "monthly"),
    url(`/${locale}/rules`, 0.5, "monthly"),
    url(`/${locale}/contact`, 0.7, "monthly"),
  ]);

  const slugs = getAllEventSlugs();
  const eventRoutes = LOCALES.flatMap((locale) =>
    slugs.map((slug) => url(`/${locale}/events/${slug}`, 0.8, "weekly"))
  );

  return [...staticRoutes, ...eventRoutes];
}
