"use client";

import { useEffect, useRef, useCallback } from "react";

function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext || (window as unknown as Record<string, typeof AudioContext>).webkitAudioContext)();
  } catch {
    return null;
  }
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.03
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function SoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(false);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext();
    }
    if (ctxRef.current?.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      enabledRef.current = true;
      getCtx();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [getCtx]);

  useEffect(() => {
    if (!enabledRef.current) return;

    const handleMouseOver = (e: MouseEvent) => {
      const ctx = getCtx();
      if (!ctx) return;
      const target = e.target as HTMLElement;
      const el = target.closest("a, button");
      if (el) {
        playTone(ctx, 800, 0.08, "sine", 0.02);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const ctx = getCtx();
      if (!ctx) return;
      const target = e.target as HTMLElement;
      const el = target.closest("a, button");
      if (el) {
        playTone(ctx, 600, 0.06, "triangle", 0.04);
        setTimeout(() => playTone(ctx, 900, 0.08, "sine", 0.03), 50);
      }
    };

    const handleScroll = (() => {
      let lastScrollY = window.scrollY;
      let lastPlay = 0;
      return () => {
        const now = Date.now();
        if (now - lastPlay < 100) return;
        const delta = Math.abs(window.scrollY - lastScrollY);
        if (delta > 200) {
          const ctx = getCtx();
          if (ctx) {
            playTone(ctx, 400 + Math.min(delta / 5, 200), 0.05, "sine", 0.01);
          }
          lastPlay = now;
        }
        lastScrollY = window.scrollY;
      };
    })();

    const handleKeyDown = (e: KeyboardEvent) => {
      const ctx = getCtx();
      if (!ctx) return;
      if (e.key === "Tab") {
        playTone(ctx, 500, 0.04, "square", 0.015);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [getCtx]);

  return null;
}
