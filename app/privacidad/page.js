import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export const metadata = {
  title: "Política de Privacidad | Ora Store",
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="bg-parchment">
        <div className="mx-auto max-w-2xl px-5 md:px-8 py-16 md:py-24">
          <h1 className="font-display font-light text-ink text-3xl md:text-4xl mb-8 tracking-wide">
            Política de Privacidad
          </h1>

          <div className="font-body font-light text-ink/70 text-sm leading-relaxed space-y-6">
            <section>
              <h2 className="font-display text-ink text-lg mb-2">
                1. Qué datos recolectamos
              </h2>
              <p>
                Este sitio no te pide crear una cuenta ni completar formularios para
                navegar el catálogo. Los únicos datos personales que maneja Ora Store
                son los que vos mismo compartís al escribirnos por WhatsApp para
                coordinar una compra, como tu nombre, tu dirección de envío si
                corresponde, y tu número de teléfono.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">
                2. Uso de la información
              </h2>
              <p>
                Los datos que compartís por WhatsApp se usan exclusivamente para
                coordinar y cumplir tu pedido. No los vendemos ni los compartimos con
                terceros con fines comerciales.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">3. Cookies y analítica</h2>
              <p>
                Usamos Vercel Analytics para entender de forma agregada y anónima cómo
                se usa el sitio (por ejemplo, qué páginas se visitan más). No usamos
                cookies de seguimiento publicitario ni identificamos individualmente a
                quien navega.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">
                4. Almacenamiento del carrito
              </h2>
              <p>
                El carrito de compras se guarda únicamente en tu propio navegador, no
                en nuestros servidores. Si borrás los datos de navegación de tu
                navegador, el carrito se vacía.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">5. Contacto</h2>
              <p>
                Ante cualquier consulta sobre tus datos, podés escribirnos a
                +54 9 362 436-8290.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
