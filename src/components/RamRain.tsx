"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RamStick {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  emoji: string;
  speed: number;
}

interface RamRainProps {
  chaosLevel: number;
}

const RAM_EMOJIS = ["🧠", "💾", "🔧", "💻", "🖥️", "⚡", "🔥", "💸", "📈", "🚀"];

export default function RamRain({ chaosLevel }: RamRainProps) {
  const [ramSticks, setRamSticks] = useState<RamStick[]>([]);

  // Spawn RAM sticks
  useEffect(() => {
    const spawnInterval = Math.max(500 / chaosLevel, 50);

    const interval = setInterval(() => {
      const newStick: RamStick = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1.5,
        emoji: RAM_EMOJIS[Math.floor(Math.random() * RAM_EMOJIS.length)],
        speed: 2 + Math.random() * 5 * chaosLevel,
      };

      setRamSticks((prev) => [...prev.slice(-50), newStick]); // Keep max 50 sticks
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [chaosLevel]);

  // Move RAM sticks down
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setRamSticks((prev) =>
        prev
          .map((stick) => ({
            ...stick,
            y: stick.y + stick.speed,
            rotation: stick.rotation + 5,
          }))
          .filter((stick) => stick.y < 120) // Remove when off screen
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {ramSticks.map((stick) => (
          <motion.div
            key={stick.id}
            className="absolute text-4xl md:text-6xl select-none"
            style={{
              left: `${stick.x}%`,
              top: `${stick.y}%`,
              transform: `rotate(${stick.rotation}deg) scale(${stick.scale})`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: stick.scale }}
            exit={{ opacity: 0 }}
          >
            {stick.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Flying RAM SVG images */}
      <FlyingRamImages chaosLevel={chaosLevel} />
    </div>
  );
}

// Separate component for RAM stick images
function FlyingRamImages({ chaosLevel }: { chaosLevel: number }) {
  const [images, setImages] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    direction: "left" | "right" | "down";
  }>>([]);

  useEffect(() => {
    const spawnInterval = Math.max(2000 / chaosLevel, 200);

    const interval = setInterval(() => {
      const directions: Array<"left" | "right" | "down"> = ["left", "right", "down"];
      const direction = directions[Math.floor(Math.random() * directions.length)];

      let x, y;
      if (direction === "left") {
        x = 110;
        y = Math.random() * 80 + 10;
      } else if (direction === "right") {
        x = -10;
        y = Math.random() * 80 + 10;
      } else {
        x = Math.random() * 100;
        y = -10;
      }

      setImages((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          x,
          y,
          rotation: Math.random() * 360,
          direction,
        },
      ]);
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [chaosLevel]);

  // Move images
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setImages((prev) =>
        prev
          .map((img) => {
            const speed = 2 * chaosLevel;
            if (img.direction === "left") {
              return { ...img, x: img.x - speed, rotation: img.rotation + 10 };
            } else if (img.direction === "right") {
              return { ...img, x: img.x + speed, rotation: img.rotation - 10 };
            } else {
              return { ...img, y: img.y + speed, rotation: img.rotation + 5 };
            }
          })
          .filter((img) => img.x > -20 && img.x < 120 && img.y < 120)
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [chaosLevel]);

  return (
    <>
      {images.map((img) => (
        <motion.div
          key={img.id}
          className="absolute w-24 h-16 md:w-32 md:h-20"
          style={{
            left: `${img.x}%`,
            top: `${img.y}%`,
            transform: `rotate(${img.rotation}deg)`,
          }}
        >
          {/* RAM Stick SVG */}
          <svg viewBox="0 0 120 40" className="w-full h-full drop-shadow-lg">
            {/* PCB Board */}
            <rect x="0" y="5" width="120" height="30" rx="2" fill="#1a472a" stroke="#00ff41" strokeWidth="1"/>
            {/* Gold contacts */}
            {[...Array(16)].map((_, i) => (
              <rect key={i} x={5 + i * 7} y="32" width="4" height="8" fill="#ffd700"/>
            ))}
            {/* Memory chips */}
            {[...Array(8)].map((_, i) => (
              <rect key={i} x={8 + i * 13} y="10" width="10" height="15" fill="#0a0a0a" stroke="#333" strokeWidth="0.5"/>
            ))}
            {/* Notch */}
            <rect x="55" y="32" width="10" height="8" fill="#0d1117"/>
          </svg>
        </motion.div>
      ))}
    </>
  );
}
