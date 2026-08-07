import { notFound } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { SITE_URL } from "../../lib/constants";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartDrawer from "../../components/CartDrawer";
import ProductGallery from "../../components/ProductGallery";
import ProductDetailAddToCart from "../../components/ProductDetailAddToCart";
import ShareButton from "../../components/ShareButton";

export const revalidate = 0;

async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  if (!product) return {};

  const title = `${product.name} | Ora Store`;
  const description =
    product.description ||
    `${product.name} — perfume árabe disponible en Ora Store.`;
  const image = product.images?.[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/perfumes/${product.id}`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const outOfStock = (product.stock ?? 0) <= 0;
  const productUrl = `${SITE_URL}/perfumes/${product.id}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: product.images && product.images.length > 0 ? product.images : undefined,
    category: product.category || undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: product.price,
      availability: outOfStock
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      url: productUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ora Store", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Perfumes",
        item: `${SITE_URL}/#catalogo`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="bg-parchment">
        <div className="mx-auto max-w-5xl px-5 md:px-8 py-10 md:py-16">
          <nav aria-label="Breadcrumb" className="font-body text-xs text-ink/40 mb-6">
            <a href="/" className="hover:text-ink transition-colors">
              Ora Store
            </a>
            <span className="mx-2">/</span>
            <a href="/#catalogo" className="hover:text-ink transition-colors">
              Perfumes
            </a>
            <span className="mx-2">/</span>
            <span className="text-ink/60">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            <ProductGallery images={product.images ?? []} name={product.name} />

            <div className="flex flex-col">
              {product.category && (
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-gold mb-2">
                  {product.category}
                </span>
              )}
              <h1 className="font-display font-light text-ink text-3xl md:text-4xl tracking-wide mb-4">
                {product.name}
              </h1>
              <span className="font-display font-medium text-ink text-2xl mb-6">
                ${Number(product.price).toLocaleString("es-AR")}
              </span>

              {product.description && (
                <p className="font-body font-light text-ink/70 text-sm leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {!outOfStock && (product.stock ?? 0) <= 3 && (
                <p className="font-body text-[11px] uppercase tracking-[0.1em] text-ember mb-4">
                  Últimas unidades disponibles
                </p>
              )}

              <ProductDetailAddToCart product={product} />

              <div className="flex items-center justify-between mt-6">
                <p className="font-body text-ink/40 text-xs leading-relaxed max-w-[220px]">
                  El pago y el envío se coordinan por WhatsApp una vez armado tu
                  pedido en el carrito.
                </p>
                <ShareButton
                  title={product.name}
                  text={`Mirá ${product.name} en Ora Store`}
                  url={productUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
