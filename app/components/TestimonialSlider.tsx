"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useSpring,
} from "framer-motion";

/* ── Data ───────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CEO, NexaFlow",
    initials: "SC",
    quote:
      "ydrop didn't just build our website — they rebuilt our conversion strategy. Within 60 days of launch, our qualified lead volume tripled. I didn't think an agency could move this fast.",
    rating: 5,
  },
  {
    name: "Marcus Reid",
    role: "Founder, PulseCart",
    initials: "MR",
    quote:
      "Every agency we tried before gave us beautiful design and zero results. ydrop was the first team that asked about our revenue goals before opening Figma. That's the difference.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Head of Growth, Orbitz SaaS",
    initials: "PN",
    quote:
      "Our site redesign by ydrop cut our bounce rate by 38% and doubled demo requests in the first month. They treat your metrics like their own KPIs.",
    rating: 5,
  },
  {
    name: "Tom Wallis",
    role: "Marketing Director, Uplift Agency",
    initials: "TW",
    quote:
      "The 3D tilt and animation work ydrop shipped for our landing page generated more comments than any campaign we've run. People actually share our URL now.",
    rating: 5,
  },
];

/* ── Star rating ────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-neon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Single tilt card ───────────────────────────────────────── */
function TiltCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Spring-damped motion values for smooth tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 180, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 180, damping: 20 });

  const rotateY = useTransform(springX, [-120, 120], [-10, 10]);
  const rotateX = useTransform(springY, [-120, 120], [8, -8]);
  const glowX = useTransform(springX, [-120, 120], [0, 100]);
  const glowY = useTransform(springY, [-120, 120], [0, 100]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(e.clientX - (rect.left + rect.width / 2));
    rawY.set(e.clientY - (rect.top + rect.height / 2));
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 sm:p-8 flex flex-col gap-5 select-none overflow-hidden"
    >
      {/* Dynamic highlight that follows tilt */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(280px circle at ${glowX}% ${glowY}%, rgba(255,0,0,0.07), transparent 60%)`,
        }}
      />

      {/* Neon top accent bar */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />

      {/* Stars */}
      <Stars count={t.rating} />

      {/* Quote */}
      <blockquote className="flex-1 text-foreground/80 text-sm sm:text-base leading-relaxed font-medium">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/8">
        <div className="w-10 h-10 rounded-full bg-neon/15 border border-neon/30 flex items-center justify-center text-neon text-xs font-bold flex-shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-foreground/45">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main slider ────────────────────────────────────────────── */
const CARD_WIDTH = 380;
const GAP = 24;
const STRIDE = CARD_WIDTH + GAP;

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const trackX = useMotionValue(0);
  const total = TESTIMONIALS.length;

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    setCurrent(clamped);
    animate(trackX, -clamped * STRIDE, { type: "spring", stiffness: 260, damping: 30 });
  }, [total, trackX]);

  const onDragEnd = useCallback((_: unknown, info: { offset: { x: number } }) => {
    const threshold = STRIDE * 0.25;
    if (info.offset.x < -threshold) goTo(current + 1);
    else if (info.offset.x > threshold) goTo(current - 1);
    else goTo(current); // snap back
  }, [current, goTo]);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-dark-300 tech-grid overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="section-heading text-foreground">What Clients Say</h2>
          <p className="section-subheading mx-auto mt-4">
            Real results from real businesses — no stock photos, no fake names.
          </p>
        </div>

        {/* Drag hint */}
        <p className="text-center text-xs text-foreground/25 mb-6 tracking-widest uppercase">
          ← drag to explore →
        </p>

        {/* Slider viewport */}
        <div className="relative overflow-visible flex justify-center">
          <div
            className="overflow-hidden"
            style={{ width: Math.min(CARD_WIDTH, typeof window !== "undefined" ? window.innerWidth - 48 : CARD_WIDTH) }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: -(total - 1) * STRIDE, right: 0 }}
              dragElastic={0.12}
              onDragEnd={onDragEnd}
              style={{ x: trackX }}
              className="flex cursor-grab active:cursor-grabbing"
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  style={{ width: CARD_WIDTH, marginRight: i < total - 1 ? GAP : 0, flexShrink: 0 }}
                >
                  <TiltCard t={t} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Dot nav + arrows */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-foreground/50 hover:text-neon hover:border-neon/40 disabled:opacity-25 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 9999,
                  background: i === current ? "var(--color-neon)" : "rgba(255,255,255,0.15)",
                  boxShadow: i === current ? "0 0 10px rgba(255,0,0,0.6)" : "none",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-foreground/50 hover:text-neon hover:border-neon/40 disabled:opacity-25 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
