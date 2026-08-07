"use client";

import { useState } from "react";

export default function ShareButton({ title, text, url }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (e) {
        // el usuario canceló el share nativo, no hacemos nada
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // último recurso: nada, el link ya está en la barra de direcciones
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.1em] text-ink/50 hover:text-ink transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="M8.2 10.7 15.8 6.3M8.2 13.3l7.6 4.4" strokeLinecap="round" />
      </svg>
      {copied ? "Link copiado ✓" : "Compartir"}
    </button>
  );
}
