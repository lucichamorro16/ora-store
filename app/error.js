"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-parchment flex flex-col items-center justify-center text-center px-5">
      <div
        className="w-14 h-14 mb-6"
        style={{
          background: "#141414",
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          opacity: 0.15,
        }}
      />
      <h1 className="font-display font-light text-ink text-3xl md:text-4xl mb-3 tracking-wide">
        Algo no salió bien
      </h1>
      <p className="font-body font-light text-ink/60 text-sm mb-8 max-w-sm">
        Tuvimos un problema para cargar esta página. Probá de nuevo en unos
        segundos.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={() => reset()} className="btn-gold px-8 py-3 rounded-full">
          Reintentar
        </button>
        <a href="/" className="btn-outline-gold px-8 py-3 rounded-full inline-block">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
