import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PROFILE } from "@/lib/data";
import "./globals.css";

const sans = localFont({ src: "../fonts/InterTight-Variable.woff2", variable: "--font-sans", weight: "100 900", display: "swap" });
const serif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif", display: "swap",
});
const mono = localFont({ src: "../fonts/JetBrainsMono-Variable.woff2", variable: "--font-mono", weight: "100 800", display: "swap" });

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = `${PROFILE.name} — ${PROFILE.role}`;
export const metadata: Metadata = {
  metadataBase: new URL(base),
  title, description: PROFILE.resumeSummary,
  icons: { icon: "/favicon.png" },
  openGraph: { title, description: PROFILE.resumeSummary, type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${PROFILE.name} portrait` }] },
  twitter: { card: "summary_large_image", title, description: PROFILE.resumeSummary, images: ["/og.jpg"] },
};
export const viewport: Viewport = { themeColor: "#f4f2ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
