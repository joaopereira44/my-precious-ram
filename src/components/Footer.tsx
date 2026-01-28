"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo pequeno */}
        <motion.p
          className="text-2xl font-pixel text-[#00ff41] mb-4"
          whileHover={{ scale: 1.05 }}
        >
          MY PRECIOUS RAM
        </motion.p>

        {/* Disclaimer divertido */}
        <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
          Este site é uma sátira. Não nos responsabilizamos por
          traumas causados ao ver preços de RAM em 2025.
          <br />
          <span className="text-[#ffd700]">Gollum approves this message.</span>
        </p>

        {/* Links sociais */}
        <div className="flex justify-center gap-6 mb-6">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.2, rotate: -5 }}
          >
            <Twitter className="w-6 h-6" />
          </motion.a>
        </div>

        {/* Créditos */}
        <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
          Feito com <Heart className="w-4 h-4 text-red-500" /> e
          <span className="text-[#00ff41]">0GB de RAM disponível</span>
        </p>

        <p className="text-gray-700 text-xs mt-2">
          © 2025 - Quando RAM custava apenas um rim
        </p>
      </div>
    </footer>
  );
}
