"use client";

import { motion } from "framer-motion";
import { memeData } from "@/lib/memeData";

interface MemeGalleryProps {
  isChaosMode: boolean;
}

export default function MemeGallery({ isChaosMode }: MemeGalleryProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-pixel text-[#00ff41] text-center mb-12 neon-text">
          🎭 MEME GALLERY 🎭
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memeData.map((meme, index) => (
            <motion.div
              key={meme.id}
              className="bg-gray-900/80 rounded-xl overflow-hidden border border-gray-700 hover:border-[#00ff41] transition-colors"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                rotate: isChaosMode ? [0, -2, 2, 0] : 0
              }}
            >
              {/* Imagem placeholder - você pode adicionar mais imagens */}
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl">
                {meme.emoji}
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  {meme.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {meme.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {meme.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#00ff41]/20 text-[#00ff41] text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
