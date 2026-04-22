import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import AgeGate from "@/components/AgeGate";
import Nav from "@/components/Nav";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const LOCALES = ["cs", "en"] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as "cs" | "en")) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full bg-bg text-zinc-100 antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <AgeGate />
          <Nav locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
