"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import MemeGallery from "@/components/MemeGallery";
import PriceCounter from "@/components/PriceCounter";
import TurnDownButton from "@/components/TurnDownButton";
import PixelGlasses from "@/components/PixelGlasses";
import Footer from "@/components/Footer";

export default function Home() {
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [showGlasses, setShowGlasses] = useState(false);

  const triggerChaos = () => {
    setIsChaosMode(true);
    setShowGlasses(true);

    // Adiciona classe de shake no body
    document.body.classList.add("screen-shake");

    // Remove após animação
    setTimeout(() => {
      document.body.classList.remove("screen-shake");
      setIsChaosMode(false);
    }, 3000);

    // Esconde óculos depois
    setTimeout(() => setShowGlasses(false), 4000);
  };

  return (
    <main className={`min-h-screen relative ${isChaosMode ? "screen-shake" : ""}`}>
      {showGlasses && <PixelGlasses />}

      <HeroSection isChaosMode={isChaosMode} />

      <PriceCounter isChaosMode={isChaosMode} />

      <TurnDownButton onTrigger={triggerChaos} />

      <MemeGallery isChaosMode={isChaosMode} />

      <Footer />
    </main>
  );
}
