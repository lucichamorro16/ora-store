"use client";

import { useState } from "react";
import { useCart } from "../lib/cartContext";

export default function ProductDetailAddToCart({ product }) {
  const { addItem } = useCart();
  const outOfStock = (product.stock ?? 0) <= 0;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3 border border-ink/25 rounded-full px-3 py-2">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={outOfStock}
          aria-label="Restar"
          className="w-6 h-6 flex items-center justify-center text-ink/70 hover:text-ink disabled:opacity-30"
        >
          −
        </button>
        <span className="font-body text-ink text-sm w-4 text-center">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(product.stock ?? 99, q + 1))}
          disabled={outOfStock}
          aria-label="Sumar"
          className="w-6 h-6 flex items-center justify-center text-ink/70 hover:text-ink disabled:opacity-30"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={outOfStock}
        className="btn-gold flex-1 py-3 rounded-full disabled:opacity-30 disabled:pointer-events-none"
      >
        {added ? "Agregado ✓" : outOfStock ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}
