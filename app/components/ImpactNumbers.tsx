"use client";

import { useEffect, useRef, useState } from "react";

/* ── Data ───────────────────────────────────────────────────── */
const STATS = [
  { end: 300, suffix: "%",  label: "Average Traffic Growth",    sub: "Across all client websites in the first 90 days." },
  { end: 50,  suffix: "+",  label: "Projects Delivered",        sub: "From MVPs to full-scale agency platforms." },
  { end: 98,  suffix: "%",  label: "Client Satisfaction Rate",  sub: "Measured by post-launch feedback surveys." },
];

/* ── Custom hook: count-up triggered by IntersectionObserver ── */
function useCountUp(end: number, duration = 1800, triggered: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(startValue + eased * (end - startValue)));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [triggered, end, duration]);

  return value;
}

/* ── Stat Column ─────────────────────────────────────────────── */
function StatColumn({
  stat,
  triggered,
  delay,
}: {
  stat: (typeof STATS)[number];
  triggered: boolean;
  delay: number;
}) {
  const [active, setActive] = useState(false);
  const count = useCountUp(stat.end, 1800, active);

  useEffect(() => {
    if (!triggered) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [triggered, delay]);

  return (
    <div className="group flex flex-col items-center text-center px-6 py-10 rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm transition-all duration-500 hover:border-[#39FF14]/20 hover:bg-[#39FF14]/3">
      {/* Count-up number */}
      <div
        className="relative font-black leading-none tracking-tighter mb-4"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
          color: "#39FF14",
          textShadow: active
            ? "0 0 20px rgba(57,255,20,0.7), 0 0 60px rgba(57,255,20,0.3)"
            : "none",
          transition: "text-shadow 0.6s ease",
        }}
      >
        {/* Odometer digit flip effect — render each digit separately */}
        <span className="tabular-nums">
          {count}
          {stat.suffix}
        </span>

        {/* Glow ring behind number */}
        <span
          className="absolute inset-0 -z-10 rounded-full pointer-events-none"
          style={{
            background: active
              ? "radial-gradient(ellipse at center, rgba(57,255,20,0.08) 0%, transparent 70%)"
              : "none",
            transition: "background 0.6s ease",
          }}
        />
      </div>

      {/* Label */}
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 tracking-tight">
        {stat.label}
      </h3>

      {/* Divider */}
      <div
        className="w-10 h-0.5 rounded-full mb-3 transition-all duration-700"
        style={{
          background: active ? "#39FF14" : "rgba(255,255,255,0.1)",
          boxShadow: active ? "0 0 8px rgba(57,255,20,0.6)" : "none",
        }}
      />

      {/* Sub-text */}
      <p className="text-sm text-foreground/50 leading-relaxed max-w-[220px]">
        {stat.sub}
      </p>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────── */
export default function ImpactNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="py-24 sm:py-32 bg-dark-100 tech-grid-dense"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#39FF14" }}>
            Impact in Numbers
          </p>
          <h2 className="section-heading text-foreground">
            Results That Speak for Themselves
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Real metrics from real clients — no vanity stats, no fluff.
          </p>
        </div>

        {/* Three stat columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATS.map((stat, i) => (
            <StatColumn
              key={stat.label}
              stat={stat}
              triggered={triggered}
              delay={i * 180}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
