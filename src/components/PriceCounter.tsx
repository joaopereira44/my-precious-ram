"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Skull, DollarSign } from "lucide-react";

interface PriceCounterProps {
  isChaosMode: boolean;
}

export default function PriceCounter({ isChaosMode }: PriceCounterProps) {
  const [price, setPrice] = useState(299.99);
  const [priceHistory] = useState([
    { year: "2019", price: "$50", emoji: "😊" },
    { year: "2021", price: "$80", emoji: "🤔" },
    { year: "2023", price: "$150", emoji: "😰" },
    { year: "2024", price: "$250", emoji: "😱" },
    { year: "2025", price: "YOUR SOUL", emoji: "💀" },
  ]);

  // Incrementa o preço gradualmente
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => {
        const increment = isChaosMode ? 50 : 0.01;
        return Math.min(prev + increment, 9999.99);
      });
    }, isChaosMode ? 100 : 1000);

    return () => clearInterval(interval);
  }, [isChaosMode]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Contador principal */}
        <motion.div
          className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-2xl p-8 mb-12 border border-red-500/30"
          animate={isChaosMode ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.2, repeat: isChaosMode ? Infinity : 0 }}
        >
          <h2 className="text-2xl md:text-3xl font-pixel text-white text-center mb-6">
            💸 RAM PRICE RIGHT NOW 💸
          </h2>

          <div className="flex items-center justify-center gap-4">
            <DollarSign className="w-12 h-12 text-[#00ff41]" />
            <motion.span
              className={`text-5xl md:text-7xl font-bold font-pixel ${
                isChaosMode ? "text-red-500" : "text-[#00ff41]"
              }`}
              animate={isChaosMode ? { scale: [1, 1.1, 1] } : {}}
            >
              {price.toFixed(2)}
            </motion.span>
            <TrendingUp className="w-12 h-12 text-red-500 animate-bounce" />
          </div>

          <p className="text-center text-gray-400 mt-4">
            * Preço atualizado a cada segundo que uma IA treina
          </p>
        </motion.div>

        {/* Timeline de preços */}
        <h3 className="text-2xl font-pixel text-[#00ff41] text-center mb-8">
          📉 EVOLUÇÃO DO PREÇO (32GB DDR5) 📉
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {priceHistory.map((item, index) => (
            <motion.div
              key={item.year}
              className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "#00ff41" }}
            >
              <span className="text-4xl mb-2 block">{item.emoji}</span>
              <p className="text-[#ffd700] font-bold text-lg">{item.year}</p>
              <p className={`text-xl font-pixel ${
                item.price === "YOUR SOUL" ? "text-red-500" : "text-white"
              }`}>
                {item.price}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mensagem dramática */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <p className="text-xl text-gray-400 flex items-center justify-center gap-2">
            <Skull className="text-red-500" />
            Em 2026, você precisará vender um rim para 64GB
            <Skull className="text-red-500" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
