"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/* ── Module definitions ─────────────────────────────────────── */
const MODULES = [
  { id: 0, title: "Data-Driven Ads",     icon: "◈", desc: "Precision targeting with AI-powered bidding strategies." },
  { id: 1, title: "UX Optimization",     icon: "⬡", desc: "Convert visitors with psychology-first interface design." },
  { id: 2, title: "AI Automation",       icon: "⬢", desc: "Scale operations without scaling your headcount." },
  { id: 3, title: "Full-Funnel Strategy",icon: "◇", desc: "Close every leak from awareness to retention." },
];

const LINE_D = [
  "M 0,105 C 70,105 140,105 200,105 C 270,105 335,105 400,105",
  "M 0,105 C 70,100 140,90  200,80  C 270,72  335,66  400,62",
  "M 0,102 C 70,93  140,76  200,58  C 270,44  335,34  400,26",
  "M 0,98  C 70,84  140,62  200,40  C 270,26  335,15  400,10",
  "M 0,92  C 70,72  140,48  200,26  C 270,14  335,7   400,3",
];
const AREA_D = [
  "M 0,105 C 70,105 140,105 200,105 C 270,105 335,105 400,105 L 400,115 L 0,115 Z",
  "M 0,105 C 70,100 140,90  200,80  C 270,72  335,66  400,62  L 400,115 L 0,115 Z",
  "M 0,102 C 70,93  140,76  200,58  C 270,44  335,34  400,26  L 400,115 L 0,115 Z",
  "M 0,98  C 70,84  140,62  200,40  C 270,26  335,15  400,10  L 400,115 L 0,115 Z",
  "M 0,92  C 70,72  140,48  200,26  C 270,14  335,7   400,3   L 400,115 L 0,115 Z",
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} role="switch" aria-checked={on}
      className="relative w-11 h-6 rounded-full flex-shrink-0 focus:outline-none transition-all duration-300"
      style={{ background: on ? "var(--color-neon)" : "rgba(255,255,255,0.1)", boxShadow: on ? "0 0 12px rgba(255,0,0,0.5)" : "none" }}>
      <span className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300"
        style={{ left: on ? "calc(100% - 20px)" : "4px" }} />
    </button>
  );
}

function ModuleCard({ mod, on, onToggle, jackpot }: { mod: (typeof MODULES)[number]; on: boolean; onToggle: () => void; jackpot: boolean }) {
  const activeColor = jackpot ? "#39FF14" : "var(--color-neon)";
  const activeBorder = jackpot ? "rgba(57,255,20,0.5)" : "rgba(255,0,0,0.45)";
  const activeGlow = jackpot ? "0 0 24px rgba(57,255,20,0.12)" : "0 0 24px rgba(255,0,0,0.1)";
  return (
    <div className="relative rounded-2xl p-4 sm:p-5 flex flex-col gap-3 overflow-hidden transition-all duration-500 h-full"
      style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(24px)",
        border: on ? `1.5px solid ${activeBorder}` : "1px solid rgba(255,255,255,0.07)",
        boxShadow: on ? activeGlow : "none" }}>
      <div className="text-2xl leading-none transition-colors duration-300" style={{ color: on ? activeColor : "rgba(255,255,255,0.2)" }}>{mod.icon}</div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-foreground/80 leading-tight">{mod.title}</p>
        <Toggle on={on} onToggle={onToggle} />
      </div>
      <p className="text-xs text-foreground/40 leading-relaxed hidden sm:block">{mod.desc}</p>
      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
        style={{ color: on ? activeColor : "rgba(255,255,255,0.2)" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: on ? activeColor : "rgba(255,255,255,0.2)", boxShadow: on ? `0 0 6px ${activeColor}` : "none" }} />
        {on ? (jackpot ? "Maximised" : "Optimizing...") : "Inactive"}
      </div>
    </div>
  );
}

function RevenueChart({ count, jackpot }: { count: number; jackpot: boolean }) {
  const lineColor = jackpot ? "#39FF14" : "var(--color-neon)";
  const glowColor = jackpot ? "rgba(57,255,20,0.6)" : "rgba(255,0,0,0.6)";
  const fillId = jackpot ? "fillGreen" : "fillRed";
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="flex-1 relative">
        <svg viewBox="0 0 400 115" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fillRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF0000" stopOpacity="0.25" /><stop offset="100%" stopColor="#FF0000" stopOpacity="0" /></linearGradient>
            <linearGradient id="fillGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#39FF14" stopOpacity="0.3" /><stop offset="100%" stopColor="#39FF14" stopOpacity="0" /></linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {[20, 45, 70, 95].map((y) => (<line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />))}
          <motion.path d={AREA_D[count]} fill={`url(#${fillId})`} animate={{ d: AREA_D[count] }} transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }} />
          <motion.path d={LINE_D[count]} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)"
            animate={{ d: LINE_D[count], stroke: lineColor }} transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }} />
          <motion.circle cx="400" animate={{ cy: parseFloat(LINE_D[count].split(" ").at(-1)!), fill: lineColor }} r="5"
            transition={{ duration: 0.9 }} style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }} />
        </svg>
      </div>
      <div className="flex justify-between text-[9px] text-foreground/20 px-1">
        {labels.map((l) => <span key={l}>{l}</span>)}
      </div>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────── */
export default function GrowthOS() {
  const [active, setActive] = useState<Set<number>>(new Set());
  const jackpot = active.size === 4;
  const count = active.size;
  const toggle = useCallback((id: number) => {
    setActive((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }, []);

  const revenues = ["$0", "$24.8k", "$61.3k", "$89.4k", "$147.2k"];
  const gains    = ["Activate modules to grow", "+42% vs baseline", "+148% vs baseline", "+261% vs baseline", "+489% vs baseline"];

  return (
    <section id="growth-os" className="py-16 sm:py-24 lg:py-32 bg-dark-100 relative overflow-hidden">
      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "200px" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">Growth OS</p>
          <h2 className="section-heading text-foreground">Your Revenue Control Panel</h2>
          <p className="section-subheading mx-auto mt-4">Activate each growth module and watch your revenue curve respond.</p>
        </div>

        {/* Responsive bento grid */}
        <div className="growth-os-grid gap-4">

          {/* Left modules */}
          <div className="growth-os-col1-r1"><ModuleCard mod={MODULES[0]} on={active.has(0)} onToggle={() => toggle(0)} jackpot={jackpot} /></div>
          <div className="growth-os-col1-r2"><ModuleCard mod={MODULES[1]} on={active.has(1)} onToggle={() => toggle(1)} jackpot={jackpot} /></div>

          {/* Center chart — full width on mobile, center col on desktop */}
          <div className="growth-os-chart relative rounded-3xl p-5 sm:p-6 overflow-hidden flex flex-col gap-4 order-first lg:order-none"
            style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(24px)",
              border: jackpot ? "1.5px solid rgba(57,255,20,0.4)" : "1px solid rgba(255,255,255,0.07)",
              boxShadow: jackpot ? "0 0 60px rgba(57,255,20,0.1)" : "none", transition: "border 0.5s, box-shadow 0.5s" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Global Revenue</p>
                <motion.p className="text-2xl sm:text-3xl font-black leading-none" animate={{ color: jackpot ? "#39FF14" : "#ffffff" }} transition={{ duration: 0.5 }}>
                  {revenues[count]}
                </motion.p>
                <motion.p className="text-xs font-semibold mt-1"
                  animate={{ color: jackpot ? "#39FF14" : count > 0 ? "var(--color-neon)" : "rgba(255,255,255,0.3)" }}>
                  {gains[count]}
                </motion.p>
              </div>
              <div className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                style={{ borderColor: jackpot ? "rgba(57,255,20,0.4)" : "rgba(255,255,255,0.1)", color: jackpot ? "#39FF14" : "rgba(255,255,255,0.4)", background: jackpot ? "rgba(57,255,20,0.08)" : "transparent" }}>
                {active.size}/4 active
              </div>
            </div>
            <div className="flex-1" style={{ minHeight: 140 }}><RevenueChart count={count} jackpot={jackpot} /></div>
            {jackpot && (
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3 pt-2">
                <p className="text-xs text-foreground/40 text-center">All systems active — maximum growth unlocked</p>
                <a href="#contact" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm text-black hover:scale-105 transition-transform"
                  style={{ background: "linear-gradient(135deg,#39FF14,#00cc44)", boxShadow: "0 0 30px rgba(57,255,20,0.5)" }}>
                  🚀 Claim Your Growth
                </a>
              </motion.div>
            )}
          </div>

          {/* Right modules */}
          <div className="growth-os-col3-r1"><ModuleCard mod={MODULES[2]} on={active.has(2)} onToggle={() => toggle(2)} jackpot={jackpot} /></div>
          <div className="growth-os-col3-r2"><ModuleCard mod={MODULES[3]} on={active.has(3)} onToggle={() => toggle(3)} jackpot={jackpot} /></div>
        </div>
      </div>
    </section>
  );
}
