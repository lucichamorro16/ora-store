"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  const [category, setCategory] = useState("Todos");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["Todos", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    if (category === "Todos") return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <section id="catalogo" className="bg-parchment py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="divider-star font-display text-sm tracking-[0.3em] uppercase mb-3">
          <span>Catálogo</span>
        </div>
        <h2 className="font-display font-light text-ink text-3xl md:text-4xl mb-10 tracking-wide">
          Nuestras esencias
        </h2>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-3 mb-10">
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

        {filtered.length === 0 ? (
          <p className="font-body text-ink/50 text-sm">
            Todavía no hay productos cargados en esta categoría. Volvé pronto.
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
