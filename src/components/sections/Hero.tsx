"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, FolderOpen, MessageCircle } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

interface Profile {
  name: string;
  title: string;
  heroStatement: string;
  cvUrl: string;
  profileImage: string;
}

export function Hero({ profile }: { profile: Profile | null }) {
  const prefersReduced = useReducedMotion();
  const name = profile?.name || "M. Ihwal Maulana";
  const title = profile?.title || "Informatics Student | Full Stack Developer | AI Enthusiast";
  const heroStatement = profile?.heroStatement || "Building digital solutions through software development, modern technology, and continuous learning.";
  const cvUrl = profile?.cvUrl || "/documents/CV.pdf";
  const profileImage = profile?.profileImage || "/images/profile.jpg";

  const nameParts = name.split(" ").filter(Boolean);
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const firstName = lastName ? nameParts.slice(0, -1).join(" ") : name;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
    >
      {/* 3D Background Scene */}
      {!prefersReduced && <HeroScene />}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-medium mb-2"
            >
              Halo, saya
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
            >
              {firstName}{" "}
              <span className="gradient-text">{lastName}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-muted mb-4"
            >
              {title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted max-w-lg mb-8 leading-relaxed"
            >
              {heroStatement}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href={cvUrl}
                download
                className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 active:scale-95"
                data-cursor-hover
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <a
                href="#projects"
                className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
                data-cursor-hover
              >
                <FolderOpen className="w-4 h-4" />
                View Projects
              </a>
              <a
                href="#contact"
                className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-surface transition-all duration-300 hover:scale-105 active:scale-95"
                data-cursor-hover
              >
                <MessageCircle className="w-4 h-4" />
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 rounded-full border-2 border-dashed border-accent/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 rounded-full border border-accent/10"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-orange-500 rounded-full blur-2xl opacity-15 scale-110" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border-4 border-accent/30 overflow-hidden bg-surface shadow-2xl"
              >
                <Image
                  src={profileImage}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  priority
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
