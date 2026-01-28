"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  isChaosMode: boolean;
}

export default function HeroSection({ isChaosMode }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-8">
      {/* Título com efeito glitch */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-8xl font-pixel text-[#00ff41] neon-text text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        data-text="MY PRECIOUS RAM"
      >
        <span className={isChaosMode ? "glitch-text" : ""} data-text="MY PRECIOUS RAM">
          MY PRECIOUS RAM
        </span>
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        className="text-lg md:text-2xl text-gray-400 text-center mb-12 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        &quot;They&apos;re taking the RAM to Isengard!&quot;
        <br />
        <span className="text-[#ffd700]">- Every AI Company, 2025</span>
      </motion.p>

      {/* Imagem do Gollum */}
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`relative ${isChaosMode ? "animate-shake" : "animate-float"}`}>
          {/* Glow effect atrás da imagem */}
          <div className="absolute inset-0 bg-[#00ff41]/20 blur-3xl rounded-full" />

          <Image
            src="/images/gollum-ram.png"
            alt="Gollum segurando RAM - My Precious"
            width={500}
            height={500}
            className="relative z-10 rounded-lg"
            priority
          />

          {/* Efeito de brilho na RAM */}
          <motion.div
            className="absolute top-20 right-20 w-4 h-4 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>

      {/* Texto dramático */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xl md:text-2xl text-white font-bold">
          <span className="text-red-500">NVIDIA & OpenAI:</span> We needs it. We wants it.
        </p>
        <p className="text-gray-500 mt-2">
          *DDR5 prices crying in the corner*
        </p>
      </motion.div>
    </section>
  );
}
