"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const posRef = useRef({ x: 0, y: 0 });
  const dotPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const checkHoverTargets = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest("a, button, [data-cursor-hover]");
      if (hoverEl) {
        setIsHovering(true);
        setCursorText(hoverEl.getAttribute("data-cursor-text") || "");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    let animId: number;
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      dotPosRef.current.x += (posRef.current.x - dotPosRef.current.x) * 0.15;
      dotPosRef.current.y += (posRef.current.y - dotPosRef.current.y) * 0.15;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotPosRef.current.x}px, ${dotPosRef.current.y}px)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", checkHoverTargets);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", checkHoverTargets);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 ease-out ${
            isClicking
              ? "w-8 h-8 border-white/80"
              : isHovering
              ? "w-14 h-14 border-accent/80 bg-accent/10"
              : "w-8 h-8 border-white/50"
          }`}
        >
          <AnimatePresence>
            {cursorText && isHovering && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold uppercase"
              >
                {cursorText}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-100 ${
            isClicking ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white"
          }`}
        />
      </div>
    </div>
  );
}
