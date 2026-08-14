"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../lib/cartContext";
import { WHATSAPP_NUMBER } from "../lib/constants";

const LOW_STOCK_THRESHOLD = 3;

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const outOfStock = (product.stock ?? 0) <= 0;
  const lowStock = !outOfStock && (product.stock ?? 0) <= LOW_STOCK_THRESHOLD;
  const needsQuote = !product.price || Number(product.price) <= 0;
  const images = product.images ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [flashKey, setFlashKey] = useState(0);

  function goToImage(index) {
    setActiveIndex(index);
    setFlashKey((k) => k + 1);
  }

  function cycleImage(e) {
    if (images.length < 2) return;
    e.preventDefault();
    goToImage((activeIndex + 1) % images.length);
  }

  const consultLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hola! Quiero consultar precio y stock de ${product.name}`
  )}`;

  return (
    <div className="product-card rounded-xl overflow-hidden flex flex-col">
      <div
        className={`relative aspect-square bg-oud overflow-hidden ${images.length > 1 ? "cursor-pointer" : ""}`}
        onClick={cycleImage}
      >
        {images.length > 0 ? (
          images.map((src, i) => (
            <Image
              key={src + i}
              src={src}
              alt={product.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-all duration-500 ease-out active:scale-[0.97] ${
                i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/30 star-mark w-16 h-16 mx-auto my-auto" />
        )}

        {flashKey > 0 && (
          <div
            key={flashKey}
            className="photo-flash pointer-events-none absolute inset-0 bg-parchment"
          />
        )}

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(i);
                }}
                aria-label={`Ver foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  i === activeIndex ? "w-4 bg-parchment" : "w-1.5 bg-parchment/40"
                }`}
              />
            ))}
          </div>
        )}

        {lowStock && (
          <span className="absolute top-2 left-2 font-body text-[9px] tracking-[0.12em] uppercase bg-parchment text-ink px-2 py-1 rounded-full">
            Últimas unidades
          </span>
        )}

        {outOfStock && (
          <div className="absolute inset-0 bg-ink/70 flex items-center justify-center">
            <span className="font-body text-[11px] tracking-[0.2em] uppercase text-parchment/80 border border-gold/40 px-3 py-1.5 rounded-full">
              Sin stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {product.category && (
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/70 mb-1">
            {product.category}
          </span>
        )}
        <Link href={`/perfumes/${product.id}`} className="group">
          <h3 className="font-display text-ink text-lg leading-snug mb-1 group-hover:underline decoration-ink/30 underline-offset-4">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="font-body text-ink/50 text-xs leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        {needsQuote ? (
          <a
            href={consultLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold w-full mt-auto pt-2 px-4 py-2 rounded-full text-center"
          >
            Consultar Stock
          </a>
        ) : (
          <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-display font-medium text-ink text-lg">
              ${Number(product.price).toLocaleString("es-AR")}
            </span>
            <button
              disabled={outOfStock}
              onClick={() => addItem(product)}
              className="btn-outline-gold w-full sm:w-auto px-4 py-2 rounded-full disabled:opacity-30 disabled:pointer-events-none"
            >
              Agregar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
