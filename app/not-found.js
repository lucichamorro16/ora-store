import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-parchment min-h-[60vh] flex flex-col items-center justify-center text-center px-5 py-24">
        <div
          className="w-14 h-14 mb-6"
          style={{
            background: "#141414",
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            opacity: 0.15,
          }}
        />
        <h1 className="font-display font-light text-ink text-3xl md:text-4xl mb-3 tracking-wide">
          No encontramos esta página
        </h1>
        <p className="font-body font-light text-ink/60 text-sm mb-8 max-w-md">
          El producto o la página que buscás ya no está disponible.
        </p>
        <a href="/#catalogo" className="btn-gold px-8 py-3 rounded-full inline-block">
          Ver catálogo
        </a>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
