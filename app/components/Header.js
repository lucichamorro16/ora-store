"use client";

import { useCart } from "../lib/cartContext";
import Logo from "./Logo";

export default function Header() {
  const { count, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-parchment/95 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-5 md:px-8 flex items-center justify-between h-20">
        <a href="/" className="flex items-center gap-3">
          <Logo size={40} priority />
          <span className="font-display font-light text-xl tracking-[0.2em] text-ink">
            ORA STORE
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 font-body text-xs tracking-[0.2em] uppercase text-ink/70">
          <a href="/#catalogo" className="hover:text-ink transition-colors">Catálogo</a>
          <a href="/#sobre-ora" className="hover:text-ink transition-colors">Sobre Ora</a>
          <a href="/#contacto" className="hover:text-ink transition-colors">Contacto</a>
        </nav>

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Abrir carrito"
          className="relative flex items-center justify-center w-10 h-10 border border-ink/25 rounded-full hover:border-ink transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="1.5">
            <path d="M6 6h15l-1.5 9h-12L5 3H2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="20" r="1.4" fill="#141414" stroke="none" />
            <circle cx="18" cy="20" r="1.4" fill="#141414" stroke="none" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-ink text-parchment text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
