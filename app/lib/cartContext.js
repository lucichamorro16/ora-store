"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "ora-store-cart";
export const WHATSAPP_NUMBER = "5493624368290"; // +54 9 362 436-8290, sin signos para el link wa.me

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // cargar carrito guardado
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("No se pudo leer el carrito guardado", e);
    }
    setHydrated(true);
  }, []);

  // persistir carrito
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: Math.min(i.qty + qty, product.stock ?? 99) }
            : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] ?? null,
          stock: product.stock,
          qty,
        },
      ];
    });
    setIsOpen(true);
  }

  function updateQty(id, qty) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  function buildWhatsAppLink() {
    const lines = items.map(
      (i) =>
        `• ${i.name} x${i.qty} — $${(i.price * i.qty).toLocaleString("es-AR")}`
    );
    const message = [
      "Hola Ora Store! Quiero hacer este pedido:",
      "",
      ...lines,
      "",
      `Total: $${subtotal.toLocaleString("es-AR")}`,
    ].join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  const value = {
    items,
    isOpen,
    setIsOpen,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    subtotal,
    count,
    buildWhatsAppLink,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
