import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NusaFin — Ikan Hias Nusantara ke Pasar Dunia",
  description: "Marketplace dan konsolidasi ekspor ikan hias dari petani Indonesia untuk buyer internasional.",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="id"><body>{children}</body></html>;
}
