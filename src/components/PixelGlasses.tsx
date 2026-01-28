"use client";

import { motion } from "framer-motion";

export default function PixelGlasses() {
  return (
    <motion.div
      className="fixed top-1/4 left-1/2 z-50 pointer-events-none"
      initial={{ y: -200, x: "-50%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 200, opacity: 0 }}
      transition={{ type: "spring", damping: 10 }}
    >
      {/* Óculos pixelados feitos com CSS */}
      <div className="relative">
        {/* Frame */}
        <div className="flex gap-2">
          {/* Lente esquerda */}
          <div className="w-24 h-16 bg-black border-8 border-black relative">
            <div className="absolute inset-2 bg-gradient-to-br from-blue-600 to-purple-600" />
            {/* Reflexo */}
            <div className="absolute top-3 left-3 w-4 h-2 bg-white/30" />
          </div>

          {/* Ponte */}
          <div className="w-8 h-4 bg-black self-center" />

          {/* Lente direita */}
          <div className="w-24 h-16 bg-black border-8 border-black relative">
            <div className="absolute inset-2 bg-gradient-to-br from-blue-600 to-purple-600" />
            {/* Reflexo */}
            <div className="absolute top-3 left-3 w-4 h-2 bg-white/30" />
          </div>
        </div>

        {/* Hastes */}
        <div className="absolute -left-8 top-4 w-8 h-3 bg-black" />
        <div className="absolute -right-8 top-4 w-8 h-3 bg-black" />
      </div>

      {/* Texto DEAL WITH IT */}
      <motion.p
        className="text-white font-pixel text-xl text-center mt-4 drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ textShadow: "2px 2px 0 #000" }}
      >
        DEAL WITH IT
      </motion.p>
    </motion.div>
  );
}
