"use client";

import { useState } from "react";

interface Labels {
  name: string;
  email: string;
  date: string;
  size: string;
  message: string;
  submit: string;
  success: string;
  error: string;
}

interface Props {
  labels: Labels;
}

export default function ContactForm({ labels: l }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      date: fd.get("date"),
      size: fd.get("size"),
      message: fd.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <p className="text-zinc-300 text-sm leading-relaxed py-4">{l.success}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-zinc-500 tracking-widest uppercase mb-1.5">
          {l.name}
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-zinc-500 tracking-widest uppercase mb-1.5">
          {l.email}
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 tracking-widest uppercase mb-1.5">
            {l.date}
          </label>
          <input
            type="text"
            name="date"
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 tracking-widest uppercase mb-1.5">
            {l.size}
          </label>
          <input
            type="text"
            name="size"
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-zinc-500 tracking-widest uppercase mb-1.5">
          {l.message}
        </label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-accent">{l.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-accent hover:bg-accent-dark disabled:opacity-50 text-white text-xs font-medium tracking-widest uppercase py-4 transition-colors"
      >
        {status === "loading" ? "…" : l.submit}
      </button>
    </form>
  );
}
