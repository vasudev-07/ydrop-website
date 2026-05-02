"use client";

import { useState } from "react";

/* ── Data ───────────────────────────────────────────────────── */
const CARDS = [
  {
    problem: {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
      ),
      label: "The Problem",
      title: "Guesswork Marketing",
      body: "Burning budget on campaigns with no data, targeting audiences who never convert — and no idea why.",
    },
    solution: {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      label: "ydrop Solution",
      title: "Data-Driven Marketing",
      body: "Every campaign backed by real analytics. We track, measure, and optimise until the numbers prove ROI — guaranteed.",
    },
  },
  {
    problem: {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
        </svg>
      ),
      label: "The Problem",
      title: "Beautiful But Broken",
      body: "A site that looks great in Dribbble screenshots but fails to guide real visitors toward any action — high bounce, low conversion.",
    },
    solution: {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      label: "ydrop Solution",
      title: "Conversion-First Design",
      body: "Pixel-perfect interfaces rooted in user psychology. Every element earns its place by moving visitors toward a measurable action.",
    },
  },
  {
    problem: {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      ),
      label: "The Problem",
      title: "Leaky Revenue Funnels",
      body: "Traffic arrives, shows interest, and silently leaves. No follow-up, no retargeting, no second chance — revenue leaked at every stage.",
    },
    solution: {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      label: "ydrop Solution",
      title: "Full-Funnel Strategy",
      body: "We architect every customer touchpoint — from first impression to repeat purchase — so nothing falls through the cracks.",
    },
  },
];

/* ── Flip Card ──────────────────────────────────────────────── */
function FlipCard({ card }: { card: (typeof CARDS)[number] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-72 sm:h-80 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="flip-card-inner relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── Front face: Problem ─────────────────── */}
        <div
          className="flip-card-front absolute inset-0 rounded-2xl border border-white/8 bg-dark-300/80 backdrop-blur-sm p-6 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Label */}
          <p className="text-xs font-bold uppercase tracking-widest text-foreground/30 mb-4">
            {card.problem.label}
          </p>
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-foreground/30 mb-4">
            {card.problem.icon}
          </div>
          {/* Title */}
          <h3 className="text-lg font-bold text-foreground/50 mb-2 tracking-tight">
            {card.problem.title}
          </h3>
          {/* Body */}
          <p className="text-sm text-foreground/35 leading-relaxed flex-1">
            {card.problem.body}
          </p>
          {/* Hint */}
          <p className="text-[10px] text-foreground/20 uppercase tracking-widest mt-4">
            Click to see the fix →
          </p>
        </div>

        {/* ── Back face: Solution ─────────────────── */}
        <div
          className="flip-card-back absolute inset-0 rounded-2xl p-6 flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0) 60%)",
            border: "1.5px solid rgba(16,185,129,0.35)",
            boxShadow: "0 0 30px rgba(16,185,129,0.12), inset 0 0 20px rgba(16,185,129,0.04)",
          }}
        >
          {/* Top glow bar */}
          <div
            className="absolute top-0 left-6 right-6 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(16,185,129,0.6), transparent)" }}
          />

          {/* Label */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#10B981" }}
          >
            {card.solution.label}
          </p>
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{
              background: "rgba(16,185,129,0.12)",
              color: "#10B981",
              boxShadow: "0 0 14px rgba(16,185,129,0.25)",
            }}
          >
            {card.solution.icon}
          </div>
          {/* Title */}
          <h3
            className="text-lg font-bold mb-2 tracking-tight"
            style={{ color: "#10B981" }}
          >
            {card.solution.title}
          </h3>
          {/* Body */}
          <p className="text-sm text-foreground/70 leading-relaxed flex-1">
            {card.solution.body}
          </p>
          {/* Back hint */}
          <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: "rgba(16,185,129,0.4)" }}>
            ← Click to go back
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────── */
export default function WhatWeSolve() {
  return (
    <section id="what-we-solve" className="py-24 sm:py-32 bg-dark-200 tech-grid">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            What We Solve
          </p>
          <h2 className="section-heading text-foreground">Problems We Eliminate</h2>
          <p className="section-subheading mx-auto mt-4">
            Hover each card to see how ydrop turns your biggest pain points into competitive advantages.
          </p>
        </div>

        {/* 3-col flip grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <FlipCard key={card.problem.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
