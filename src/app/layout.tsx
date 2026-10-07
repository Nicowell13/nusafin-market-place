import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./language";

export const metadata: Metadata = {
  title: "NusaFin — Ikan Hias Nusantara ke Pasar Dunia",
  description: "Prototipe marketplace dan konsolidasi ekspor ikan hias dari petani Indonesia untuk buyer Eropa dan AS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id"><body><LanguageProvider>{children}</LanguageProvider></body></html>;
}
