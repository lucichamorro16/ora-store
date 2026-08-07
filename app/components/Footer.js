import Logo from "./Logo";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "../lib/constants";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-ink border-t border-parchment/10">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <Logo size={80} className="mb-4" />
          <p id="sobre-ora" className="font-body font-light text-parchment/60 text-sm leading-relaxed max-w-xs">
            Perfumería árabe seleccionada con criterio: fragancias intensas,
            concentradas y de larga duración, para quienes eligen dejar huella.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Ora Store"
            className="mt-4 inline-flex items-center gap-2 text-parchment/60 hover:text-parchment transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span className="font-body text-xs">@ora.storeimp</span>
          </a>
        </div>

        <div>
          <h4 className="font-display font-light text-parchment text-base mb-4 tracking-wide">Contacto</h4>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-parchment/80 hover:text-parchment transition-colors"
          >
            +54 9 362 436-8290
          </a>
          <p className="font-body font-light text-parchment/50 text-xs mt-3">
            Consultas y pedidos por WhatsApp, todos los días.
          </p>
        </div>

        <div>
          <h4 className="font-display font-light text-parchment text-base mb-4 tracking-wide">Ora Store</h4>
          <p className="font-body font-light text-parchment/40 text-xs leading-relaxed">
            © {new Date().getFullYear()} Ora Store. Todos los derechos reservados.
          </p>
          <div className="flex flex-col gap-1.5 mt-3">
            <a
              href="/terminos"
              className="font-body font-light text-parchment/30 text-[11px] hover:text-parchment/60"
            >
              Términos y condiciones
            </a>
            <a
              href="/privacidad"
              className="font-body font-light text-parchment/30 text-[11px] hover:text-parchment/60"
            >
              Política de privacidad
            </a>
            <a
              href="/admin"
              className="font-body font-light text-parchment/30 text-[11px] hover:text-parchment/60"
            >
              Acceso administrador
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-parchment/10 py-5">
        <p className="text-center font-body font-light text-parchment/40 text-[11px] tracking-[0.1em]">
          Sitio creado por Lautaro Yudi
        </p>
      </div>
    </footer>
  );
}
