"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, FolderOpen, MessageCircle } from "lucide-react";
import Image from "next/image";

interface Profile {
  name: string;
  title: string;
  heroStatement: string;
  cvUrl: string;
  profileImage: string;
}

function AnimatedOrbs() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/5%,transparent_70%)]" />;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full bg-accent/8 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -60, 50, 0], y: [0, 80, -30, 0], scale: [1, 0.8, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] right-[5%] w-80 h-80 rounded-full bg-orange-500/8 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 40, -70, 0], y: [0, -40, 60, 0], scale: [1, 1.3, 0.7, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] left-[30%] w-72 h-72 rounded-full bg-accent/6 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 60, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-[60%] right-[20%] w-48 h-48 rounded-full bg-amber-500/6 blur-3xl"
      />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -600],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear",
          }}
          className="absolute w-1 h-1 rounded-full bg-accent/40"
          style={{
            left: `${15 + i * 15}%`,
            bottom: "-5%",
          }}
        />
      ))}
    </div>
  );
}

export function Hero({ profile }: { profile: Profile | null }) {
  const name = profile?.name || "M. Ihwal Maulana";
  const title = profile?.title || "Informatics Student | Full Stack Developer | AI Enthusiast";
  const heroStatement = profile?.heroStatement || "Building digital solutions through software development, modern technology, and continuous learning.";
  const cvUrl = profile?.cvUrl || "/documents/CV.pdf";
  const profileImage = profile?.profileImage || "/images/profile.png";

  const nameParts = name.split(" ").filter(Boolean);
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const firstName = lastName ? nameParts.slice(0, -1).join(" ") : name;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
    >
      <AnimatedOrbs />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/5%,transparent_70%)]" />

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
              Hello, I&apos;m
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-lg shadow-accent/25"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-white transition-colors"
              >
                <FolderOpen className="w-4 h-4" />
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-surface transition-colors"
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
