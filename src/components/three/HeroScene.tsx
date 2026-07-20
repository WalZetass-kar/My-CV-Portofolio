"use client";

import { motion } from "framer-motion";

function FloatingShape({
  className,
  delay = 0,
  duration = 20,
  children,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -30, 20, -10, 0],
        x: [0, 15, -10, 5, 0],
        rotateX: [0, 45, -20, 30, 0],
        rotateY: [0, -30, 60, -15, 0],
        rotateZ: [0, 10, -5, 15, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: "1200px" }}>
      {/* Octahedron - Red */}
      <FloatingShape className="top-[15%] left-[8%]" delay={0} duration={22}>
        <div
          className="w-16 h-16 md:w-20 md:h-20"
          style={{ transformStyle: "preserve-3d", animation: "spin3d 12s linear infinite" }}
        >
          <div className="absolute inset-0 bg-accent/20 border border-accent/40" style={{ transform: "rotateY(0deg) translateZ(30px)" }} />
          <div className="absolute inset-0 bg-accent/15 border border-accent/30" style={{ transform: "rotateY(90deg) translateZ(30px)" }} />
          <div className="absolute inset-0 bg-accent/25 border border-accent/50" style={{ transform: "rotateX(90deg) translateZ(30px)" }} />
        </div>
      </FloatingShape>

      {/* Torus - Orange */}
      <FloatingShape className="top-[25%] right-[10%]" delay={2} duration={25}>
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-orange-500/30 relative" style={{ transformStyle: "preserve-3d", animation: "floatTorus 8s ease-in-out infinite" }}>
          <div className="absolute inset-1 rounded-full border-2 border-orange-500/20" />
          <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, transparent 50%, var(--background) 70%)", opacity: 0.6 }} />
        </div>
      </FloatingShape>

      {/* Cube - Red/Orange */}
      <FloatingShape className="bottom-[20%] left-[20%]" delay={4} duration={18}>
        <div
          className="w-12 h-12 md:w-14 md:h-14"
          style={{ transformStyle: "preserve-3d", animation: "spinCube 15s linear infinite" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/25 to-orange-500/20 border border-accent/30 backface-hidden" style={{ transform: "translateZ(24px)" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-orange-500/15 border border-accent/25 backface-hidden" style={{ transform: "translateZ(-24px)" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/22 to-orange-500/18 border border-accent/28 backface-hidden" style={{ transform: "rotateY(90deg) translateZ(24px)" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/18 to-orange-500/22 border border-accent/32 backface-hidden" style={{ transform: "rotateY(-90deg) translateZ(24px)" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/24 to-orange-500/16 border border-accent/26 backface-hidden" style={{ transform: "rotateX(90deg) translateZ(24px)" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-orange-500/20 border border-accent/30 backface-hidden" style={{ transform: "rotateX(-90deg) translateZ(24px)" }} />
        </div>
      </FloatingShape>

      {/* Triangle - Red */}
      <FloatingShape className="top-[60%] right-[15%]" delay={1} duration={20}>
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-accent/25" style={{ filter: "drop-shadow(0 0 10px rgba(239,68,68,0.3))", animation: "spinY 10s linear infinite" }} />
      </FloatingShape>

      {/* Circle dots - particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/30"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -(Math.random() * 40 + 20), 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Glow orbs */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
    </div>
  );
}
