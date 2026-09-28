import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "Lumière Studio",
    template: "%s · Lumière Studio",
  },
  description: "Reserve a private appointment for cut, color, and care at Lumière Studio.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f4f0ea",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-ink">{children}</body>
    </html>
  );
}
