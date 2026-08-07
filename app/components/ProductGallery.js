"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images && images.length > 0;

  return (
    <div>
      <div
        className={`relative aspect-square bg-oud overflow-hidden rounded-xl ${
          images?.length > 1 ? "cursor-pointer" : ""
        }`}
        onClick={() => {
          if (images?.length > 1) setActiveIndex((i) => (i + 1) % images.length);
        }}
      >
        {hasImages ? (
          images.map((src, i) => (
            <Image
              key={src + i}
              src={src}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
              className={`object-cover transition-all duration-500 ease-out ${
                i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/30 star-mark w-24 h-24 mx-auto my-auto" />
        )}
      </div>

      {images?.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                i === activeIndex ? "w-6 bg-ink" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
