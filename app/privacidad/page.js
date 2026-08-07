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
            <p className="text-ink/40 text-xs">
              [Texto general de partida — te recomendamos que lo revise un profesional
              antes de la publicación definitiva del sitio.]
            </p>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">
                1. Qué datos recolectamos
              </h2>
              <p>
                Este sitio no te pide que crees una cuenta ni completes formularios
                para navegar el catálogo. Los únicos datos personales que maneja Ora
                Store son los que vos mismo compartís al escribir por WhatsApp para
                coordinar una compra (nombre, dirección de envío si corresponde,
                número de teléfono).
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">
                2. Uso de la información
              </h2>
              <p>
                Los datos que compartís por WhatsApp se usan exclusivamente para
                coordinar y cumplir tu pedido. No se venden ni se comparten con
                terceros con fines comerciales.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">3. Cookies y analítica</h2>
              <p>
                Este sitio utiliza Vercel Analytics para entender de forma agregada y
                anónima cómo se usa el sitio (páginas visitadas, ubicación
                aproximada). No se usan cookies de seguimiento publicitario ni se
                identifica individualmente a los visitantes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">
                4. Almacenamiento del carrito
              </h2>
              <p>
                El carrito de compras se guarda únicamente en tu propio navegador
                (localStorage), no en nuestros servidores. Si borrás los datos de
                navegación de tu navegador, el carrito se vacía.
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
