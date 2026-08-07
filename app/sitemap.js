import { SITE_URL } from "./lib/constants";
import { supabase } from "./lib/supabaseClient";

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const { data: products } = await supabase
    .from("products")
    .select("id, created_at")
    .eq("active", true);

  const productRoutes = (products ?? []).map((p) => ({
    url: `${SITE_URL}/perfumes/${p.id}`,
    lastModified: p.created_at ? new Date(p.created_at) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
