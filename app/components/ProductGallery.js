"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const hasImages = images && images.length > 0;

  function goToImage(index) {
    setActiveIndex(index);
    setFlashKey((k) => k + 1);
  }

  // permite cerrar el zoom con la tecla Escape
  useEffect(() => {
    if (!zoomOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setZoomOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomOpen]);

  return (
    <div>
      <div
        className={`relative aspect-square bg-oud overflow-hidden rounded-xl ${
          hasImages ? "cursor-zoom-in" : ""
        }`}
        onClick={() => {
          if (hasImages) setZoomOpen(true);
        }}
      >
        {hasImages ? (
          images.map((src, i) => (
            <Image
              key={src + i}
              src={src}
              alt={name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
              className={`object-cover transition-all duration-500 ease-out active:scale-[0.98] ${
                i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/30 star-mark w-24 h-24 mx-auto my-auto" />
        )}

        {flashKey > 0 && (
          <div
            key={flashKey}
            className="photo-flash pointer-events-none absolute inset-0 bg-parchment"
          />
        )}

        {hasImages && (
          <span className="absolute bottom-3 right-3 bg-ink/60 text-parchment text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-full pointer-events-none">
            Ver más grande
          </span>
        )}
      </div>

      {images?.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToImage(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                i === activeIndex ? "w-6 bg-ink" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      )}

      {/* Lightbox: click para ver la foto en grande */}
      {zoomOpen && hasImages && (
        <div
          className="fixed inset-0 z-[60] bg-ink/90 flex items-center justify-center p-5 animate-[fadeIn_0.25s_ease-out]"
          onClick={() => setZoomOpen(false)}
        >
          <button
            onClick={() => setZoomOpen(false)}
            aria-label="Cerrar"
            className="absolute top-5 right-5 w-10 h-10 rounded-full border border-parchment/30 text-parchment text-xl flex items-center justify-center hover:border-parchment"
          >
            &times;
          </button>

          <div
            className={`relative w-full max-w-xl aspect-square animate-[zoomIn_0.3s_ease-out] ${
              images.length > 1 ? "cursor-pointer" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (images.length > 1) goToImage((activeIndex + 1) % images.length);
            }}
          >
            <Image
              src={images[activeIndex]}
              alt={name}
              fill
              unoptimized
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
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
                    i === activeIndex ? "w-6 bg-parchment" : "w-1.5 bg-parchment/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
