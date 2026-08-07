import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export const metadata = {
  title: "Términos y Condiciones | Ora Store",
};

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="bg-parchment">
        <div className="mx-auto max-w-2xl px-5 md:px-8 py-16 md:py-24">
          <h1 className="font-display font-light text-ink text-3xl md:text-4xl mb-8 tracking-wide">
            Términos y Condiciones
          </h1>

          <div className="font-body font-light text-ink/70 text-sm leading-relaxed space-y-6">
            <p className="text-ink/40 text-xs">
              [Este texto es un punto de partida general. Antes de publicar el sitio de
              forma definitiva, te recomendamos que lo revise un contador o gestoría
              para que se ajuste a tu situación (CUIT, condición frente al IVA, y la
              Ley de Defensa del Consumidor 24.240).]
            </p>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">1. Sobre Ora Store</h2>
              <p>
                Ora Store es una perfumería árabe que comercializa fragancias a través
                de este sitio web. Razón social: [completar]. CUIT: [completar].
                Domicilio: [completar]. Contacto: +54 9 362 436-8290.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">2. Productos y precios</h2>
              <p>
                Los precios publicados están expresados en pesos argentinos e incluyen
                los impuestos correspondientes. Ora Store se reserva el derecho de
                modificar precios y stock sin previo aviso. La disponibilidad de stock
                se actualiza manualmente y puede sufrir demoras.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">3. Proceso de compra</h2>
              <p>
                La compra se coordina de forma directa por WhatsApp una vez armado el
                pedido en el carrito del sitio. El pago y el envío se acuerdan en esa
                conversación. La compra se confirma cuando ambas partes acuerdan el
                medio de pago y, si corresponde, el método de envío.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">
                4. Derecho de arrepentimiento
              </h2>
              <p>
                De acuerdo con la Ley de Defensa del Consumidor, el cliente tiene
                derecho a revocar la compra dentro de los 10 días corridos desde la
                recepción del producto, sin necesidad de justificar el motivo. Para
                ejercer este derecho, podés escribirnos a +54 9 362 436-8290. [Completar
                con la política de cambios/devoluciones específica del negocio.]
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">5. Modificaciones</h2>
              <p>
                Ora Store puede modificar estos términos en cualquier momento. Los
                cambios entran en vigencia desde su publicación en esta página.
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
