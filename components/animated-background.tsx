"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  const blobs = Array.from({ length: 4 });
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {blobs.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            width: 500,
            height: 500,
            background: `radial-gradient(circle at center, ${
              i % 3 === 0
                ? "rgba(249, 115, 22, 0.35)" // orange-500
                : i % 3 === 1
                  ? "rgba(239, 68, 68, 0.35)" // red-500
                  : "rgba(192, 38, 211, 0.35)" // purple-600
            } 0%, transparent 70%)`,
            top: `${10 + i * 15}%`,
            left: `${i % 2 === 0 ? "5%" : "60%"}`,
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, i % 2 === 0 ? 25 : -25, 0],
          }}
          transition={{
            duration: 12 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
