"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ChaosPriceProps {
  chaosLevel: number;
}

export default function ChaosPrice({ chaosLevel }: ChaosPriceProps) {
  const [price, setPrice] = useState(99.99);
  const [displayPrice, setDisplayPrice] = useState("99.99");
  const [isGlitching, setIsGlitching] = useState(false);

  // Price goes UP FAST
  useEffect(() => {
    const baseSpeed = 50; // ms
    const speed = Math.max(baseSpeed / chaosLevel, 10);

    const interval = setInterval(() => {
      setPrice((prev) => {
        // Random jumps based on chaos level
        const baseIncrement = 0.01 * chaosLevel;
        const randomJump = Math.random() > 0.9 ? Math.random() * 100 * chaosLevel : 0;
        const newPrice = prev + baseIncrement + randomJump;

        // Sometimes glitch the display
        if (Math.random() > 0.95) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 100);
        }

        return newPrice;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [chaosLevel]);

  // Format price with chaos
  useEffect(() => {
    if (isGlitching) {
      // Show random garbage when glitching
      const glitchChars = "!@#$%^&*()ERROR404";
      let glitched = "";
      for (let i = 0; i < 8; i++) {
        glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      setDisplayPrice(glitched);
    } else if (price > 999999) {
      setDisplayPrice("∞");
    } else if (price > 99999) {
      setDisplayPrice("YOUR SOUL");
    } else if (price > 9999) {
      setDisplayPrice("1 KIDNEY");
    } else {
      setDisplayPrice(price.toFixed(2));
    }
  }, [price, isGlitching]);

  const priceColor = price > 9999 ? "text-red-500" : price > 999 ? "text-orange-500" : "text-[#00ff41]";

  return (
    <motion.div
      className="relative my-8"
      animate={{
        scale: [1, 1 + chaosLevel * 0.01, 1],
        rotate: chaosLevel > 5 ? [-1, 1, -1] : 0,
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 blur-3xl opacity-50"
        style={{
          background: price > 9999 ? "red" : price > 999 ? "orange" : "#00ff41",
        }}
      />

      {/* Price label */}
      <motion.p
        className="text-xl md:text-2xl text-white font-pixel text-center mb-2"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        💸 32GB DDR5 PRICE RIGHT NOW 💸
      </motion.p>

      {/* THE BIG PRICE */}
      <div className="flex items-center justify-center gap-2">
        <motion.span
          className="text-4xl md:text-6xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          💀
        </motion.span>

        <motion.span
          className={`text-6xl md:text-9xl lg:text-[12rem] font-bold font-pixel ${priceColor} drop-shadow-2xl`}
          style={{
            textShadow: `0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor`,
          }}
          animate={isGlitching ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.1 }}
        >
          ${displayPrice}
        </motion.span>

        <motion.span
          className="text-4xl md:text-6xl"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          🔥
        </motion.span>
      </div>

      {/* Subtext */}
      <motion.p
        className="text-center text-gray-500 mt-4 text-sm md:text-base"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        * Price increases every time an AI breathes
      </motion.p>

      {/* Warning messages based on price */}
      {price > 500 && price < 1000 && (
        <motion.p
          className="text-yellow-500 text-center font-pixel mt-2"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          ⚠️ PRICE IS GETTING SPICY ⚠️
        </motion.p>
      )}
      {price > 1000 && price < 5000 && (
        <motion.p
          className="text-orange-500 text-center font-pixel mt-2"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          🚨 NVIDIA STONKS INTENSIFY 🚨
        </motion.p>
      )}
      {price > 5000 && (
        <motion.p
          className="text-red-500 text-center font-pixel mt-2 text-xl"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1], rotate: [-5, 5, -5] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        >
          💀 SELL YOUR ORGANS NOW 💀
        </motion.p>
      )}
    </motion.div>
  );
}
