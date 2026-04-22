"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("agegate");
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!localStorage.getItem("garage-age-ok")) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) confirmRef.current?.focus();
  }, [visible]);

  function confirm() {
    localStorage.setItem("garage-age-ok", "1");
    setVisible(false);
  }

  function deny() {
    window.location.href = "https://www.google.com";
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="agegate-title"
      className="fixed inset-0 z-50 bg-bg flex items-center justify-center px-6"
    >
      <div className="w-full max-w-xs space-y-10 text-center">
        {/* Identity */}
        <div className="space-y-2">
          <p className="text-xs tracking-[0.4em] text-zinc-600 uppercase">{t("location")}</p>
          <p className="text-7xl font-bold tracking-tight leading-none">GARAGE</p>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <p id="agegate-title" className="text-base font-medium">
            {t("tagline")}
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed">{t("subtitle")}</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            ref={confirmRef}
            onClick={confirm}
            className="w-full py-4 bg-accent hover:bg-accent-dark text-white font-medium tracking-widest uppercase text-xs transition-colors"
          >
            {t("confirm")}
          </button>
          <button
            onClick={deny}
            className="w-full py-3 text-zinc-600 hover:text-zinc-400 text-xs tracking-widest uppercase transition-colors"
          >
            {t("deny")}
          </button>
        </div>
      </div>
    </div>
  );
}
