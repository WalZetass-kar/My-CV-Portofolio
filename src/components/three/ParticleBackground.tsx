"use client";

import { motion } from "framer-motion";

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "#f97316" : "#ffffff",
          }}
          animate={{
            y: [0, -(Math.random() * 60 + 30), 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0, 0.5, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Slow moving connecting lines effect */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="var(--accent)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
