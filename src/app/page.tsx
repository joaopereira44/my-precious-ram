"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RamRain from "@/components/RamRain";
import ChaosPrice from "@/components/ChaosPrice";
import MemeTexts from "@/components/MemeTexts";

export default function Home() {
  const [chaosLevel, setChaosLevel] = useState(1);
  const [screenShake, setScreenShake] = useState(false);

  // Increase chaos over time
  useEffect(() => {
    const interval = setInterval(() => {
      setChaosLevel((prev) => Math.min(prev + 0.1, 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Random screen shakes
  useEffect(() => {
    const shakeInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 500);
      }
    }, 3000);
    return () => clearInterval(shakeInterval);
  }, []);

  // Trigger shake on click anywhere
  const handleClick = useCallback(() => {
    setScreenShake(true);
    setChaosLevel((prev) => Math.min(prev + 0.5, 10));
    setTimeout(() => setScreenShake(false), 300);
  }, []);

  return (
    <main
      className={`min-h-screen relative overflow-hidden cursor-pointer ${screenShake ? "screen-shake" : ""}`}
      onClick={handleClick}
    >
      {/* RAM sticks falling everywhere */}
      <RamRain chaosLevel={chaosLevel} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-8xl font-pixel text-[#00ff41] neon-text text-center mb-4 glitch-text"
          data-text="MY PRECIOUS RAM"
          initial={{ scale: 0, rotate: -10 }}
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, -1, 1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          MY PRECIOUS RAM
        </motion.h1>

        {/* Subtitle meme */}
        <motion.p
          className="text-lg md:text-2xl text-gray-400 text-center mb-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          &quot;THEY&apos;RE TAKING THE RAM TO ISENGARD!&quot;
        </motion.p>

        {/* THE PRICE - CENTER OF ATTENTION */}
        <ChaosPrice chaosLevel={chaosLevel} />

        {/* Random meme texts */}
        <MemeTexts chaosLevel={chaosLevel} />
      </div>

      {/* Click instruction */}
      <motion.p
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-gray-600 text-sm font-pixel z-50"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        CLICK ANYWHERE FOR MORE CHAOS
      </motion.p>
    </main>
  );
}
