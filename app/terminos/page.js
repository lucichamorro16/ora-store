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
            <section>
              <h2 className="font-display text-ink text-lg mb-2">1. Sobre Ora Store</h2>
              <p>
                Ora Store es una perfumería árabe que exhibe su catálogo a través de
                este sitio web. La compra se coordina directamente por WhatsApp al
                +54 9 362 436-8290, donde también podés hacernos cualquier consulta.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">2. Productos y precios</h2>
              <p>
                Los precios publicados están expresados en pesos argentinos. Nos
                reservamos el derecho de actualizar precios y stock sin previo aviso.
                La disponibilidad que ves en el sitio se actualiza de forma manual, así
                que puede haber alguna demora entre una venta y su reflejo en el
                catálogo.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">3. Proceso de compra</h2>
              <p>
                Al armar tu pedido en el carrito y tocar "Finalizar por WhatsApp", se
                abre una conversación con el detalle de lo que elegiste. La compra
                queda confirmada cuando acordamos ahí el medio de pago y, si
                corresponde, el envío.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">
                4. Cambios y devoluciones
              </h2>
              <p>
                Como consumidor, tenés derecho a arrepentirte de una compra realizada
                a distancia dentro de los plazos que establece la Ley de Defensa del
                Consumidor. Si necesitás hacer un cambio o una devolución, escribinos
                por WhatsApp y lo vemos caso por caso.
              </p>
            </section>

            <section>
              <h2 className="font-display text-ink text-lg mb-2">5. Modificaciones</h2>
              <p>
                Estos términos pueden actualizarse con el tiempo. Cualquier cambio va
                a estar reflejado en esta misma página.
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
