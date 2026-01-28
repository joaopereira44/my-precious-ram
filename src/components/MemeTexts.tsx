"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MemeTextsProps {
  chaosLevel: number;
}

const MEME_TEXTS = [
  "ONE DOES NOT SIMPLY BUY RAM IN 2025",
  "NVIDIA: STONKS 📈📈📈",
  "CHROME: I'LL TAKE YOUR ENTIRE STOCK",
  "AI GO BRRRRR",
  "GAMERS ARE CRYING RN",
  "DDR6 PRICE: YOUR FIRSTBORN",
  "SILICON SHORTAGE? MORE LIKE WALLET SHORTAGE",
  "GOLLUM WAS RIGHT ALL ALONG",
  "MY PRECIOUS... MY EXPENSIVE...",
  "THEY TOOK THE RAM TO ISENGARD",
  "404: AFFORDABLE RAM NOT FOUND",
  "RIP WALLET 1990-2025",
  "POV: YOU NEED 64GB FOR CHROME",
  "SAMSUNG AND SK HYNIX LAUGHING RN",
  "JENSEN HUANG COUNTING MONEY",
  "ME: I NEED RAM | BANK ACCOUNT: NO",
  "INFLATION? NAH, THIS IS DEFLATION... OF MY WALLET",
  "BROKE SPEEDRUN ANY%",
];

export default function MemeTexts({ chaosLevel }: MemeTextsProps) {
  const [floatingTexts, setFloatingTexts] = useState<Array<{
    id: number;
    text: string;
    x: number;
    y: number;
    color: string;
  }>>([]);

  const colors = [
    "text-[#00ff41]",
    "text-yellow-400",
    "text-red-500",
    "text-blue-400",
    "text-purple-400",
    "text-orange-400",
    "text-pink-400",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5 / chaosLevel) {
        const newText = {
          id: Date.now(),
          text: MEME_TEXTS[Math.floor(Math.random() * MEME_TEXTS.length)],
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
        setFloatingTexts((prev) => [...prev.slice(-10), newText]);

        // Remove after animation
        setTimeout(() => {
          setFloatingTexts((prev) => prev.filter((t) => t.id !== newText.id));
        }, 3000);
      }
    }, 1000 / chaosLevel);

    return () => clearInterval(interval);
  }, [chaosLevel]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {floatingTexts.map((item) => (
          <motion.div
            key={item.id}
            className={`absolute font-pixel text-sm md:text-lg ${item.color} whitespace-nowrap`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.2, 1, 0.8],
              rotate: [-10, 5, -5, 10],
              y: [0, -20, -40, -60],
            }}
            transition={{ duration: 3 }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Static corner memes */}
      <motion.div
        className="absolute bottom-20 left-4 text-gray-600 font-pixel text-xs md:text-sm"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🎮 Gamers in 2025: &quot;I just wanted to play games...&quot;
      </motion.div>

      <motion.div
        className="absolute top-20 right-4 text-gray-600 font-pixel text-xs md:text-sm"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        💼 CFOs at AI companies: &quot;Buy it all&quot;
      </motion.div>
    </div>
  );
}
