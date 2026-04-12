import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-dark-100 text-foreground">
        {children}
      </body>
    </html>
  );
}
