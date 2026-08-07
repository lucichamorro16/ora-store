export default function manifest() {
  return {
    name: "Ora Store — Perfumería Árabe",
    short_name: "Ora Store",
    description: "Perfumería árabe de autor. Fragancias intensas y duraderas.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e4",
    theme_color: "#141414",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
