import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: "M. Ihwal Maulana | Full Stack Developer",
  description:
    "Professional portfolio of M. Ihwal Maulana - Informatics Student, Full Stack Developer, and AI Enthusiast specializing in web development, desktop applications, and technology solutions.",
  keywords: [
    "M. Ihwal Maulana",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "M. Ihwal Maulana" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "M. Ihwal Maulana | Full Stack Developer",
    description:
      "Professional portfolio of M. Ihwal Maulana - Informatics Student, Full Stack Developer, and AI Enthusiast.",
    type: "website",
    url: "https://www.portofoliobywal.my.id",
    images: [{ url: "/images/profile.png", width: 800, height: 800, alt: "M. Ihwal Maulana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Ihwal Maulana | Full Stack Developer",
    description:
      "Professional portfolio of M. Ihwal Maulana - Informatics Student, Full Stack Developer, and AI Enthusiast.",
    images: ["/images/profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
