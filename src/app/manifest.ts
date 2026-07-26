import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Helmetik — Helmet Cleaning, Koh Samui",
    short_name: "Helmetik",
    description:
      "Automated helmet cleaning on Koh Samui. UV-C disinfection + 3D foam, in about five minutes.",
    start_url: "/en",
    display: "standalone",
    background_color: "#08131f",
    theme_color: "#08131f",
    lang: "en",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon", sizes: "192x192", type: "image/png", purpose: "maskable" },
    ],
  };
}
