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

// productos con stock primero, agotados al final, sin tocar el resto del orden
function sortByStock(list) {
  return [...list].sort((a, b) => {
    const aOut = (a.stock ?? 0) <= 0 ? 1 : 0;
    const bOut = (b.stock ?? 0) <= 0 ? 1 : 0;
    return aOut - bOut;
  });
}

const PREFERRED_ORDER = ["Hombre", "Mujer", "Unisex"];

function sortCategories(categories) {
  const preferred = PREFERRED_ORDER.filter((c) => categories.includes(c));
  const rest = categories
    .filter((c) => !PREFERRED_ORDER.includes(c))
    .sort((a, b) => a.localeCompare(b, "es"));
  return [...preferred, ...rest];
}

function ProductRow({ title, products }) {
  return (
    <div className="mb-14 last:mb-0">
      <h3 className="font-display font-light text-ink text-xl md:text-2xl mb-5 tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function ProductGrid({ products }) {
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return sortCategories(Array.from(set));
  }, [products]);

  const hasUncategorized = useMemo(
    () => products.some((p) => !p.category),
    [products]
  );

  const q = normalize(query.trim());

  const searchFiltered = useMemo(() => {
    if (!q) return null;
    return sortByStock(
      products.filter(
        (p) =>
          normalize(p.name).includes(q) ||
          normalize(p.description).includes(q) ||
          normalize(p.category).includes(q)
      )
    );
  }, [products, q]);

  const groups = useMemo(() => {
    if (searchFiltered) return null;
    const byCategory = categories.map((cat) => ({
      title: cat,
      products: sortByStock(products.filter((p) => p.category === cat)),
    }));
    if (hasUncategorized) {
      byCategory.push({
        title: "Otros",
        products: sortByStock(products.filter((p) => !p.category)),
      });
    }
    return byCategory.filter((g) => g.products.length > 0);
  }, [products, categories, hasUncategorized, searchFiltered]);

  return (
    <section id="catalogo" className="bg-parchment py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="divider-star font-display text-sm tracking-[0.3em] uppercase mb-3">
          <span>Catálogo</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <h2 className="font-display font-light text-ink text-3xl md:text-4xl tracking-wide">
            Nuestras esencias
          </h2>

          <div className="relative w-full md:w-64">
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

        {searchFiltered ? (
          searchFiltered.length === 0 ? (
            <p className="font-body text-ink/50 text-sm">
              No encontramos ningún perfume que coincida con "{query}".
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {searchFiltered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )
        ) : groups && groups.length > 0 ? (
          groups.map((g) => (
            <ProductRow key={g.title} title={g.title} products={g.products} />
          ))
        ) : (
          <p className="font-body text-ink/50 text-sm">
            Todavía no hay productos cargados. Volvé pronto.
          </p>
        )}
      </div>
    </section>
  );
}
