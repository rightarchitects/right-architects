import type { Metadata } from "next";
import "./globals.css";
import { Lexend } from "next/font/google";
import ComingSoon from "@/components/ComingSoon";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RIGHT Architects",
    template: "%s | RIGHT Architects",
  },
  description:
    "RIGHT Architects is a Kerala-based architecture studio crafting meaningful spaces across residential, commercial, interior, and greenscape projects.",
  keywords: [
    "architects", "architecture", "Kerala", "Nilambur", "interior design",
    "RIGHT Architects", "furniture", "greenscape", "residential", "commercial",
  ],
  metadataBase: new URL("https://therightarchitects.com"),
  openGraph: {
    title: "RIGHT Architects",
    description: "Architecture studio based in Kerala, India.",
    url: "https://therightarchitects.com",
    siteName: "RIGHT Architects",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/right-logo.png",
        width: 1200,
        height: 630,
        alt: "RIGHT Architects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RIGHT Architects",
    description: "Architecture studio based in Kerala, India.",
  },
  robots:
    process.env.NEXT_PUBLIC_SITE_LIVE === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="antialiased">
        {process.env.NEXT_PUBLIC_SITE_LIVE !== "true" ? (
          <ComingSoon />
        ) : (
          children
        )}
      </body>
    </html>
  );
}