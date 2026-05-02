"use client";

import { useRef, useEffect, useCallback } from "react";
import ParticleBackground from "./ParticleBackground";
import CoasterPanel from "./GrowthRollerCoaster";

export default function HeroSection() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 3.5}deg)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden grid lg:grid-cols-[60%_40%] items-center tech-grid-dense"
    >
      {/* ── Particle field (z-0, behind everything) ── */}
      <ParticleBackground />

      {/* ── Aurora blobs ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Blob 1 — primary red, top-left */}
        <div
          className="aurora-blob-1 absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,0,0,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.9,
          }}
        />
        {/* Blob 2 — deep crimson, bottom-right */}
        <div
          className="aurora-blob-2 absolute -bottom-40 -right-32 w-[640px] h-[640px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(180,0,0,0.20) 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.85,
          }}
        />
        {/* Blob 3 — orange-red accent, center */}
        <div
          className="aurora-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,60,0,0.13) 0%, transparent 65%)",
            filter: "blur(120px)",
            opacity: 0.9,
          }}
        />
      </div>

      <div className="relative z-10 px-6 pt-24 pb-16 lg:py-20 text-center flex flex-col items-center justify-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-neon/20 bg-neon/5 text-neon text-sm font-semibold tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-neon animate-glow-pulse" />
          Next-Gen Web &amp; Conversion Infrastructure
        </div>

        {/* Headline — 3D tilt wrapper */}
        <div
          ref={tiltRef}
          style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15]">
            {/* Line 1 — drops from top with heavy bounce */}
            <span className="block text-neon animate-drop-bounce">
              We don&apos;t just build.
            </span>
            {/* Line 2 — letter-spacing expands in from center */}
            <span className="animate-letter-expand text-foreground">
              We drive measurable growth.
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="animate-fade-in-up animate-delay-200 mt-6 text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          We fuse stunning UI/UX design with data-driven marketing — so every
          pixel converts and every campaign compounds your revenue.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="btn-neon animate-glow-pulse">
            Start Your Growth
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#what-we-do"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-all text-sm font-semibold"
          >
            See What We Do
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-up animate-delay-600 mt-20 flex flex-col items-center gap-2 text-foreground/30 text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent" />
        </div>
      </div>

      {/* ── Right: Coaster panel — desktop only ─────── */}
      <div className="hidden lg:block relative z-10 h-full" style={{ minHeight: "60vh" }}>
        <CoasterPanel />
      </div>
    </section>
  );
}
