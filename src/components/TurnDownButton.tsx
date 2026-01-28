"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface TurnDownButtonProps {
  onTrigger: () => void;
}

export default function TurnDownButton({ onTrigger }: TurnDownButtonProps) {
  const handleClick = () => {
    // Dispara confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00ff41", "#ffd700", "#ff0000"],
    });

    // Mais confetti dos lados
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#00ff41", "#ffd700"],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#00ff41", "#ffd700"],
    });

    // Trigger chaos mode
    onTrigger();
  };

  return (
    <section className="py-12 px-4 flex justify-center">
      <motion.button
        onClick={handleClick}
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#00ff41] blur-xl opacity-50 group-hover:opacity-100 transition-opacity rounded-full" />

        {/* Button */}
        <div className="relative bg-gradient-to-r from-[#00ff41] to-green-600 px-8 py-6 rounded-full font-pixel text-xl md:text-2xl text-black font-bold border-4 border-white shadow-lg">
          🔊 TURN DOWN FOR WHAT 🔊
        </div>

        {/* Floating elements */}
        <motion.span
          className="absolute -top-4 -left-4 text-3xl"
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          😎
        </motion.span>
        <motion.span
          className="absolute -bottom-4 -right-4 text-3xl"
          animate={{ rotate: [0, -20, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          💥
        </motion.span>
      </motion.button>
    </section>
  );
}
