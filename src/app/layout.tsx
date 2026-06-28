import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartHydration } from "@/components/CartHydration";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Noor Collection — Mode musulmane élégante",
    template: "%s | Noor Collection",
  },
  description:
    "Boutique en ligne de vêtements musulmans pour homme et femme. Abayas, hijabs, qamis, thobes et plus. Qualité premium, livraison en France.",
  keywords: ["vêtements musulmans", "abaya", "hijab", "qamis", "mode modeste", "islam"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <CartHydration />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
