"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

// saca acentos y pasa a minúscula, así "arabe" encuentra "árabe"
function normalize(text) {
  return (text ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function ProductGrid({ products }) {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["Todos", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return products.filter((p) => {
      const matchesCategory = category === "Todos" || p.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        normalize(p.name).includes(q) ||
        normalize(p.description).includes(q) ||
        normalize(p.category).includes(q)
      );
    });
  }, [products, category, query]);

  return (
    <section id="catalogo" className="bg-parchment py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="divider-star font-display text-sm tracking-[0.3em] uppercase mb-3">
          <span>Catálogo</span>
        </div>
        <h2 className="font-display font-light text-ink text-3xl md:text-4xl mb-10 tracking-wide">
          Nuestras esencias
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-body border transition-colors ${
                    category === c
                      ? "bg-ink text-parchment border-ink"
                      : "border-ink/25 text-ink/60 hover:border-ink/60"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <div className="relative w-full md:w-64 md:ml-auto">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar perfume..."
              className="w-full bg-white border border-ink/15 rounded-full pl-10 pr-4 py-2 font-body text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:border-ink/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="font-body text-ink/50 text-sm">
            {query
              ? `No encontramos ningún perfume que coincida con "${query}".`
              : "Todavía no hay productos cargados en esta categoría. Volvé pronto."}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
