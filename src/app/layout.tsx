import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MY PRECIOUS RAM 🧠",
  description: "Site meme sobre os preços absurdos de RAM na era da IA",
  keywords: ["RAM", "meme", "AI", "Gollum", "precious", "memory prices"],
  openGraph: {
    title: "MY PRECIOUS RAM",
    description: "They're taking the RAM to Isengard!",
    images: ["/images/gollum-ram.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} scanlines`}>{children}</body>
    </html>
  );
}
