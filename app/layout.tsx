import type { Metadata } from "next";
import { Inter, Dancing_Script, Geist } from "next/font/google";
import "./globals.css";
import MouseFlashlight from "./components/MouseFlashlight";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const signature = Dancing_Script({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ydrop — We Build & Grow | Web Development & Marketing Agency",
  description:
    "YoursDrop (ydrop) combines world-class UI/UX design, website engineering, and data-driven marketing to drive measurable business growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${signature.variable} ${geist.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-dark-100 text-foreground">
        <MouseFlashlight />
        {children}
      </body>
    </html>
  );
}
