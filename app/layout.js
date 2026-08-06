import { Cormorant_Garamond, Jost, Fraunces, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./lib/cartContext";

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

export const metadata = {
  title: "Ora Store | Perfumes Árabes",
  description:
    "Perfumería árabe de autor. Fragancias intensas y duraderas, inspiradas en el oriente. Ora Store.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jost.variable} ${fraunces.variable} ${mrsSaintDelafield.variable}`}
    >
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
