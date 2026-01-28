import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MY PRECIOUS RAM 🧠 | RAM Prices Go BRRR",
  description: "They're taking the RAM to Isengard! Watch RAM prices go insane in real-time. A meme site about the absurd RAM prices in the AI era.",
  keywords: ["RAM", "meme", "AI", "Gollum", "precious", "memory prices", "DDR5", "NVIDIA", "stonks"],
  openGraph: {
    title: "MY PRECIOUS RAM 🧠",
    description: "They're taking the RAM to Isengard! Watch the chaos unfold.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MY PRECIOUS RAM 🧠",
    description: "RAM prices go BRRRRR 📈📈📈",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} scanlines`}>{children}</body>
    </html>
  );
}
