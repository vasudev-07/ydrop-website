"use client";

import { useEffect, useRef, useState } from "react";

/* ── Steps data ─────────────────────────────────────────────── */
const STEPS = [
  {
    number: "01",
    title: "Research & Audit",
    description:
      "We deep-dive into your brand, audience, competitors, and analytics to map every conversion leak and hidden growth opportunity.",
  },
  {
    number: "02",
    title: "Strategy & Design",
    description:
      "Every wireframe and pixel is rooted in user psychology — we design for measurable outcomes, not just aesthetics.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description:
      "Fast, scalable Next.js applications wired to your CRM, payment stack, and analytics platform — shipped at velocity.",
  },
  {
    number: "04",
    title: "Launch & Scale",
    description:
      "Continuous A/B testing, performance audits, and growth experiments compound your returns month over month.",
  },
];

/* ── Single step row ────────────────────────────────────────── */
function StepRow({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0; // even → card slides from left, odd → from right

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delay = `${index * 100}ms`;

  return (
    /* 3-col grid: left-card | center-node | right-card */
    <div
      ref={ref}
      className="grid items-center gap-4 sm:gap-8"
      style={{ gridTemplateColumns: "1fr 64px 1fr" }}
    >
      {/* ── Left slot ──────────────────────────────── */}
      <div className="flex justify-end">
        {/* Show card here only for even steps (desktop); always hidden on mobile via opacity trick */}
        <div
          className={`w-full max-w-xs sm:max-w-sm transition-all duration-700 ${
            isEven ? "" : "pointer-events-none select-none"
          }`}
          style={{
            opacity: isEven ? (visible ? 1 : 0) : 0,
            transform: visible ? "translateX(0)" : "translateX(-36px)",
            transitionDelay: delay,
          }}
        >
          {isEven && <StepCard step={step} align="right" />}
        </div>
      </div>

      {/* ── Center: number node ─────────────────────── */}
      <div className="flex flex-col items-center relative z-10">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-neon bg-dark-200 flex items-center justify-center relative transition-all duration-500"
          style={{
            transitionDelay: `calc(${delay} + 80ms)`,
            transform: visible ? "scale(1)" : "scale(0.4)",
            opacity: visible ? 1 : 0,
            boxShadow: visible
              ? "0 0 22px rgba(255,0,0,0.55), 0 0 50px rgba(255,0,0,0.2)"
              : "none",
          }}
        >
          <span className="text-neon font-extrabold text-lg tracking-tight leading-none">
            {step.number}
          </span>
          {visible && (
            <span className="absolute inset-0 rounded-full border border-neon/25 animate-ping opacity-30" />
          )}
        </div>
      </div>

      {/* ── Right slot ─────────────────────────────── */}
      <div className="flex justify-start">
        <div
          className={`w-full max-w-xs sm:max-w-sm transition-all duration-700 ${
            !isEven ? "" : "pointer-events-none select-none"
          }`}
          style={{
            opacity: !isEven ? (visible ? 1 : 0) : 0,
            transform: visible ? "translateX(0)" : "translateX(36px)",
            transitionDelay: delay,
          }}
        >
          {!isEven && <StepCard step={step} align="left" />}
        </div>
      </div>
    </div>
  );
}

/* ── Card content ───────────────────────────────────────────── */
function StepCard({
  step,
  align,
}: {
  step: (typeof STEPS)[number];
  align: "left" | "right";
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-5 sm:p-6 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
        {step.title}
      </h3>
      <p className="text-sm text-foreground/55 leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────── */
export default function ProcessRoadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  /* Scroll-driven line fill */
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when top of section hits bottom of viewport → 1 when bottom of section at top
      const progress = Math.min(1, Math.max(0, (vh - top) / (height + vh * 0.3)));
      setLineProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="our-process"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-dark-200"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            Our Process
          </p>
          <h2 className="section-heading text-foreground">From Audit to Revenue</h2>
          <p className="section-subheading mx-auto mt-4">
            A proven four-phase framework that turns strategy into measurable growth.
          </p>
        </div>

        {/* Roadmap */}
        <div className="relative">
          {/* ── Dashed background line ───────────────── */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-px pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 6px, transparent 6px, transparent 14px)",
            }}
          />

          {/* ── Glowing progress line (scroll-driven) ── */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-8 w-px pointer-events-none origin-top transition-none"
            style={{
              height: `calc((100% - 4rem) * ${lineProgress})`,
              background:
                "linear-gradient(to bottom, rgba(255,0,0,0.9), rgba(255,0,0,0.4))",
              boxShadow:
                lineProgress > 0
                  ? "0 0 8px rgba(255,0,0,0.7), 0 0 20px rgba(255,0,0,0.3)"
                  : "none",
            }}
          />

          {/* ── Steps ───────────────────────────────── */}
          <div className="flex flex-col gap-14 sm:gap-16">
            {STEPS.map((step, i) => (
              <StepRow key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
