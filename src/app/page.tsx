"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RamRain from "@/components/RamRain";
import ChaosPrice from "@/components/ChaosPrice";
import MemeTexts from "@/components/MemeTexts";

export default function Home() {
  const [chaosLevel, setChaosLevel] = useState(1);
  const [screenShake, setScreenShake] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/sounds/turn-down.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;
  }, []);

  // Increase chaos over time (only after started)
  useEffect(() => {
    if (!hasStarted) return;
    const interval = setInterval(() => {
      setChaosLevel((prev) => Math.min(prev + 0.1, 10));
    }, 2000);
    return () => clearInterval(interval);
  }, [hasStarted]);

  // Random screen shakes (only after started)
  useEffect(() => {
    if (!hasStarted) return;
    const shakeInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 500);
      }
    }, 3000);
    return () => clearInterval(shakeInterval);
  }, [hasStarted]);

  // Flash effect on beat (synced roughly with music)
  useEffect(() => {
    if (!hasStarted) return;
    const flashInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 100);
      }
    }, 500);
    return () => clearInterval(flashInterval);
  }, [hasStarted]);

  // Start the chaos
  const handleStart = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      audioRef.current?.play().catch(() => {
        // Audio play failed, continue without sound
        console.log("Audio autoplay blocked");
      });
      // Big initial shake
      setScreenShake(true);
      setShowFlash(true);
      setTimeout(() => {
        setScreenShake(false);
        setShowFlash(false);
      }, 500);
    }
  }, [hasStarted]);

  // Trigger shake on click anywhere
  const handleClick = useCallback(() => {
    if (!hasStarted) {
      handleStart();
      return;
    }
    setScreenShake(true);
    setShowFlash(true);
    setChaosLevel((prev) => Math.min(prev + 0.5, 10));
    setTimeout(() => {
      setScreenShake(false);
      setShowFlash(false);
    }, 300);
  }, [hasStarted, handleStart]);

  return (
    <main
      className={`min-h-screen relative overflow-hidden cursor-pointer ${screenShake ? "screen-shake" : ""}`}
      onClick={handleClick}
    >
      {/* Flash effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="fixed inset-0 bg-white z-[100] pointer-events-none"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </AnimatePresence>

      {/* START SCREEN */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl font-pixel text-[#00ff41] neon-text text-center mb-8"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 20px #00ff41",
                  "0 0 60px #00ff41, 0 0 100px #00ff41",
                  "0 0 20px #00ff41",
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              MY PRECIOUS RAM
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-400 mb-12"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🔊 TURN DOWN FOR WHAT 🔊
            </motion.p>

            <motion.button
              className="px-8 py-4 bg-[#00ff41] text-black font-pixel text-xl md:text-2xl rounded-lg"
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px #00ff41" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px #00ff41",
                  "0 0 60px #00ff41",
                  "0 0 20px #00ff41",
                ],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🎵 CLICK TO START THE CHAOS 🎵
            </motion.button>

            <motion.p
              className="text-gray-600 text-sm mt-8 font-pixel"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚠️ VOLUME WARNING ⚠️
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RAM sticks falling everywhere */}
      <RamRain chaosLevel={hasStarted ? chaosLevel : 0.5} />

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
        <ChaosPrice chaosLevel={hasStarted ? chaosLevel : 1} />

        {/* Random meme texts */}
        <MemeTexts chaosLevel={hasStarted ? chaosLevel : 0} />
      </div>

      {/* Click instruction */}
      {hasStarted && (
        <motion.p
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-gray-600 text-sm font-pixel z-50"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CLICK FOR MORE CHAOS 💥
        </motion.p>
      )}

      {/* Mute button */}
      {hasStarted && (
        <motion.button
          className="fixed top-4 right-4 z-50 bg-gray-800/50 p-3 rounded-full text-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            if (audioRef.current) {
              audioRef.current.muted = !audioRef.current.muted;
            }
          }}
        >
          🔊
        </motion.button>
      )}
    </main>
  );
}
