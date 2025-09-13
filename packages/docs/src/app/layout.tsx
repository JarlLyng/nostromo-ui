import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nostromo UI - Space-grade UI Components",
  description: "A modern UI library inspired by the USCSS Nostromo. Built with React, Vue, TypeScript, and Tailwind CSS.",
  keywords: ["UI", "components", "React", "Vue", "TypeScript", "Tailwind", "design system"],
  authors: [{ name: "Nostromo UI Team" }],
  openGraph: {
    title: "Nostromo UI - Space-grade UI Components",
    description: "A modern UI library inspired by the USCSS Nostromo. Built with React, Vue, TypeScript, and Tailwind CSS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="nostromo" data-color-scheme="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-neutral-950 text-neutral-50`}
      >
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 lg:ml-80">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
