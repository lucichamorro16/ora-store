"use client";

import Image from "next/image";
import { useCart } from "../lib/cartContext";

function MinusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 5h8" stroke="#141414" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 5h8M5 1v8" stroke="#141414" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQty,
    removeItem,
    clearCart,
    subtotal,
    count,
    buildWhatsAppLink,
  } = useCart();

  function goToCatalog() {
    setIsOpen(false);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`cart-drawer fixed top-0 right-0 h-full w-full sm:w-[430px] bg-parchment z-50 border-l border-ink/10 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
          <div className="flex items-baseline gap-2">
            <h2 className="font-display text-ink text-xl">Tu carrito</h2>
            {count > 0 && (
              <span className="font-body text-ink/40 text-xs">
                ({count} {count === 1 ? "producto" : "productos"})
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar carrito"
            className="text-ink/50 hover:text-ink text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center text-center mt-16">
              <div
                className="w-14 h-14 mb-5"
                style={{
                  background: "#14141422",
                  clipPath:
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                }}
              />
              <p className="font-body text-ink/60 text-sm mb-6">
                Todavía no agregaste ningún perfume.
              </p>
              <button
                onClick={goToCatalog}
                className="btn-outline-gold px-6 py-2.5 rounded-full"
              >
                Ver colección
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 bg-white border border-ink/10 rounded-xl p-3"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ink flex-shrink-0">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill unoptimized className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-ink text-[15px] leading-snug truncate">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Quitar ${item.name}`}
                        className="text-ink/30 hover:text-ember text-lg leading-none flex-shrink-0"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="font-body text-ink/50 text-xs mt-0.5">
                      ${Number(item.price).toLocaleString("es-AR")} c/u
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          aria-label="Restar"
                          className="w-6 h-6 border border-ink/25 rounded-full flex items-center justify-center hover:border-ink"
                        >
                          <MinusIcon />
                        </button>
                        <span className="font-body text-ink text-sm w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label="Sumar"
                          className="w-6 h-6 border border-ink/25 rounded-full flex items-center justify-center hover:border-ink"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <span className="font-display font-medium text-ink text-sm">
                        ${(item.price * item.qty).toLocaleString("es-AR")}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="font-body text-[11px] uppercase tracking-wide text-ink/35 hover:text-ember mt-4"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-ink/10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-ink/60 text-sm uppercase tracking-wide">
                Subtotal
              </span>
              <span className="font-display font-medium text-ink text-xl">
                ${subtotal.toLocaleString("es-AR")}
              </span>
            </div>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full text-center py-3.5 rounded-full inline-block"
            >
              Finalizar por WhatsApp
            </a>
            <p className="font-body text-ink/40 text-[11px] mt-3 text-center leading-relaxed">
              Te vas a redirigir a WhatsApp con tu pedido armado. Coordinamos ahí el
              pago y el envío.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
