// Archivo sin "use client" a propósito: se puede importar tanto desde
// componentes de servidor (Hero, Footer) como desde componentes de cliente
// (cartContext) sin cruzar el límite de client boundary de React.
export const WHATSAPP_NUMBER = "5493624368290"; // +54 9 362 436-8290, sin signos para el link wa.me

export const INSTAGRAM_URL = "https://www.instagram.com/ora.storeimp/";

// Usado para robots.txt, sitemap.xml y las metaetiquetas Open Graph.
// Mientras no esté conectado el dominio de nic.ar, apunta a la URL de Vercel.
// Una vez conectado el dominio, cambiar esto (o cargar NEXT_PUBLIC_SITE_URL
// como variable de entorno en Vercel) para que apunte al dominio final.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ora-store-rho.vercel.app";

