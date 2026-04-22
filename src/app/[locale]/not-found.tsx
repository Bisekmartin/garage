import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <main className="pt-28 pb-16 px-6 md:px-12 min-h-screen flex flex-col justify-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-zinc-500 tracking-[0.3em] uppercase mb-4">404</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Wrong door.
          </h1>
          <p className="text-zinc-400 leading-relaxed mb-10">
            This page doesn&apos;t exist — or it did and we got rid of it.
          </p>
          <div className="flex gap-8">
            <Link
              href="/en"
              className="text-xs text-zinc-500 hover:text-zinc-300 tracking-widest uppercase transition-colors"
            >
              ← Back home
            </Link>
            <Link
              href="/en/events"
              className="text-xs text-zinc-500 hover:text-zinc-300 tracking-widest uppercase transition-colors"
            >
              Events →
            </Link>
          </div>
        </div>
      </main>
      <Footer locale="en" />
    </>
  );
}
