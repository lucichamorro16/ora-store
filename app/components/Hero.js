import Logo from "./Logo";
import { WHATSAPP_NUMBER } from "../lib/cartContext";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden star-field-bg bg-parchment border-b border-ink/10"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-24 pb-28 md:pt-32 md:pb-36 flex flex-col items-center text-center">
        <Logo size={170} className="mb-6" priority />

        <p className="font-accent font-bold text-ink text-2xl md:text-3xl tracking-wide mb-6">
          Perfumería
        </p>

        <h1 className="font-script font-normal text-ink text-4xl sm:text-5xl md:text-6xl leading-relaxed max-w-3xl">
          "Sutileza y elegancia en cada aroma"
        </h1>

        <p className="font-body font-light max-w-lg mx-auto mt-6 text-sm leading-relaxed text-ink/60">
          Esencias árabes concentradas, seleccionadas para durar todo el día.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="#catalogo" className="btn-gold px-8 py-3.5 rounded-full inline-block">
            Ver colección
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold px-8 py-3.5 rounded-full inline-block"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 star-mark text-ink/5 w-72 h-72" />
    </section>
  );
}
