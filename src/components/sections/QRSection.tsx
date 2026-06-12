"use client";

import { QRCodeSVG } from "qrcode.react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Smartphone } from "lucide-react";

export function QRSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <section id="qr" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title="Portfolio QR Code" />
        </div>
      </section>
    );
  }

  const isDark = theme === "dark";

  return (
    <section id="qr" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Portfolio QR Code"
          subtitle="Share or scan to access my portfolio anywhere"
        />

        <ScrollReveal>
          <div className="flex flex-col items-center">
            <div className="p-8 rounded-2xl bg-card border border-border shadow-lg">
              <QRCodeSVG
                value="https://www.portofoliobywal.my.id"
                size={220}
                bgColor={isDark ? "#1e293b" : "#ffffff"}
                fgColor={isDark ? "#22d3ee" : "#0f172a"}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="mt-6 flex items-center gap-2 text-muted">
              <Smartphone className="w-5 h-5 text-accent" />
              <p className="text-sm font-medium">
                Scan to View Portfolio, Projects, and Professional Profile
              </p>
            </div>

            <a
              href="https://www.portofoliobywal.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
            >
              portofoliobywal.my.id
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
