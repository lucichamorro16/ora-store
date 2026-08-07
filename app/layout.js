import { Cormorant_Garamond, Jost, Fraunces, Mrs_Saint_Delafield } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { CartProvider } from "./lib/cartContext";
import { SITE_URL } from "./lib/constants";
import WhatsAppFloat from "./components/WhatsAppFloat";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-accent",
  display: "swap",
});

const mrsSaintDelafield = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const title = "Ora Store | Perfumería Árabe";
const description =
  "Perfumería árabe de autor. Fragancias intensas y duraderas, inspiradas en el oriente. Ora Store.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Ora Store",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport = {
  themeColor: "#141414",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jost.variable} ${fraunces.variable} ${mrsSaintDelafield.variable}`}
    >
      <body>
        <CartProvider>{children}</CartProvider>
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
