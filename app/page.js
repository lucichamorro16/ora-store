import { supabase } from "./lib/supabaseClient";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

export const revalidate = 0; // siempre traer el stock actualizado

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error trayendo productos:", error.message);
    return [];
  }
  return data ?? [];
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGrid products={products} />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
