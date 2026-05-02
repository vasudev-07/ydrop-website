"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ── Data ───────────────────────────────────────────────────── */
const HOTSPOTS = [
  { id: 0, label: "Fix Latency",     emoji: "⚡", x: 16, y: 24 },
  { id: 1, label: "Clean CSS",       emoji: "🎨", x: 78, y: 20 },
  { id: 2, label: "Optimize Images", emoji: "🖼️", x: 60, y: 58 },
  { id: 3, label: "Boost SEO",       emoji: "🔍", x: 20, y: 70 },
  { id: 4, label: "Remove Bloat",    emoji: "🧹", x: 82, y: 74 },
];

const FILTERS = [
  "blur(20px) saturate(0.05) brightness(0.55)",
  "blur(14px) saturate(0.2)  brightness(0.65)",
  "blur(9px)  saturate(0.38) brightness(0.75)",
  "blur(4px)  saturate(0.62) brightness(0.86)",
  "blur(1.5px) saturate(0.85) brightness(0.94)",
  "blur(0px)  saturate(1)    brightness(1)",
];

const MESSAGES = [
  "Your site is a disaster. Fix the hotspots!",
  "A little better... still painful to look at.",
  "Progress! Visitors might actually stay now.",
  "Looking sharp! One more tweak.",
  "Almost there — just one fix left!",
  "🚀 ydrop-powered perfection!",
];

/* ── Canvas Confetti ────────────────────────────────────────── */
function Confetti({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ["#FF0000", "#FF4444", "#ffffff", "#FF8888", "#CC0000", "#FFD700"];
    const particles = Array.from({ length: 140 }, () => ({
      x: canvas.width / 2,
      y: canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 22,
      vy: (Math.random() - 1.8) * 18,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: Math.random() * 11 + 4,
      h: Math.random() * 6 + 3,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 10,
      alpha: 1,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.5;
        p.vx *= 0.985;
        p.rot += p.rotV;
        if (frame > 35) p.alpha -= 0.016;
        p.alpha = Math.max(0, p.alpha);
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (particles.some((p) => p.alpha > 0)) {
        raf.current = requestAnimationFrame(draw);
      }
    };
    raf.current = requestAnimationFrame(draw);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [active]);

  if (!active) return null;
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-30" />;
}

/* ── Mini Website Preview ───────────────────────────────────── */
function SitePreview() {
  return (
    <div className="w-full h-full bg-[#0A0A0A] overflow-hidden select-none">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-xs font-black"><span className="text-[#FF0000]">y</span><span className="text-white">drop</span></span>
        <div className="flex gap-3">
          {["Services", "Process", "Contact"].map((l) => (
            <span key={l} className="text-[8px] text-white/40">{l}</span>
          ))}
        </div>
        <div className="px-2.5 py-1 rounded-full bg-[#FF0000] text-[7px] font-bold text-white">Get In Touch</div>
      </div>

      {/* Hero */}
      <div className="px-5 pt-5 pb-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#FF0000]/30 bg-[#FF0000]/10 mb-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />
          <span className="text-[7px] text-[#FF0000] font-semibold uppercase tracking-widest">Next-Gen Agency</span>
        </div>
        <h2 className="text-sm font-black text-white leading-tight mb-1">
          <span className="text-[#FF0000]">We don&apos;t just build.</span><br />We drive growth.
        </h2>
        <p className="text-[8px] text-white/40 mb-3">Stunning design × data-driven marketing.</p>
        <div className="flex items-center justify-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#FF0000] text-[7px] font-bold text-white" style={{ boxShadow: "0 0 12px rgba(255,0,0,0.45)" }}>
            Start Your Growth →
          </div>
          <div className="px-3 py-1.5 rounded-full border border-white/20 text-[7px] text-white/50">See What We Do</div>
        </div>
      </div>

      {/* Service cards */}
      <div className="px-4 grid grid-cols-3 gap-2">
        {[
          { t: "UI/UX Design",    d: "Pixel-perfect interfaces" },
          { t: "Web Engineering", d: "Lightning-fast apps" },
          { t: "Growth Marketing",d: "Data-driven campaigns" },
        ].map((c) => (
          <div key={c.t} className="rounded-xl border border-white/8 bg-white/5 p-2.5">
            <div className="w-5 h-5 rounded-lg bg-[#FF0000]/20 flex items-center justify-center mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF0000]/60" />
            </div>
            <p className="text-[7px] font-bold text-white mb-0.5">{c.t}</p>
            <p className="text-[6px] text-white/35 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <p className="text-[6px] text-white/20">© {new Date().getFullYear()} ydrop. All rights reserved.</p>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
export default function SiteFixer() {
  const [fixed, setFixed] = useState<Set<number>>(new Set());
  const [lastFixed, setLastFixed] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const count = fixed.size;

  const handleFix = useCallback((id: number) => {
    if (fixed.has(id) || done) return;
    const next = new Set(fixed);
    next.add(id);
    setFixed(next);
    setLastFixed(id);
    setTimeout(() => setLastFixed(null), 700);
    if (next.size === 5) {
      setTimeout(() => {
        setDone(true);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3500);
      }, 350);
    }
  }, [fixed, done]);

  const reset = () => { setFixed(new Set()); setLastFixed(null); setDone(false); setConfetti(false); };

  return (
    <section className="py-24 sm:py-32 bg-dark-300 tech-grid">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">Interactive Demo</p>
          <h2 className="section-heading text-foreground">Fix Our Broken Site</h2>
          <p className="section-subheading mx-auto mt-4">
            Click each glowing hotspot to resolve the issue. Watch the site transform live.
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-sm mx-auto mb-8">
          <div className="flex justify-between text-xs text-foreground/40 mb-1.5">
            <span>{MESSAGES[count]}</span>
            <span className="text-neon font-bold">{count}/5</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-neon rounded-full transition-all duration-700"
              style={{ width: `${(count / 5) * 100}%`, boxShadow: count > 0 ? "0 0 10px rgba(255,0,0,0.6)" : "none" }}
            />
          </div>
        </div>

        {/* Browser + game area */}
        <div className="relative">
          {/* Browser chrome */}
          <div className="rounded-t-2xl bg-dark-400 border border-white/10 border-b-0 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 bg-dark-300/80 rounded-lg px-3 py-1 text-xs text-foreground/35 font-mono">
              https://ydrop.co
            </div>
          </div>

          {/* Game viewport */}
          <div className="relative rounded-b-2xl border border-t-0 border-white/10 overflow-hidden" style={{ height: 360 }}>

            {/* Blurred preview */}
            <div className="absolute inset-0 transition-all duration-700 ease-out" style={{ filter: FILTERS[count] }}>
              <SitePreview />
            </div>

            {/* Pixel noise overlay (fades with fixes) */}
            {count < 5 && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{
                  opacity: Math.max(0, 0.85 - count * 0.18),
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='2' height='2' fill='rgba(0,0,0,0.45)'/%3E%3C/svg%3E")`,
                  backgroundSize: `${Math.max(2, 18 - count * 3.2)}px`,
                }}
              />
            )}

            {/* Hotspots */}
            {!done && HOTSPOTS.map((spot) => {
              const isFixed = fixed.has(spot.id);
              const justFixed = lastFixed === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => handleFix(spot.id)}
                  disabled={isFixed}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center gap-1.5 ${isFixed ? "cursor-default" : "cursor-pointer"}`}
                >
                  {/* Pulse ring */}
                  {!isFixed && (
                    <span className="absolute w-11 h-11 rounded-full border-2 border-neon animate-ping opacity-40" />
                  )}
                  {/* Core button */}
                  <span
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center text-base border-2 transition-all duration-300 shadow-lg
                      ${isFixed
                        ? "bg-green-500/20 border-green-400/70 scale-90"
                        : "bg-dark-400/90 border-neon hover:scale-110 hover:bg-neon/20"
                      }
                      ${justFixed ? "scale-125" : ""}
                    `}
                    style={!isFixed ? { boxShadow: "0 0 16px rgba(255,0,0,0.5)" } : {}}
                  >
                    {isFixed ? "✓" : spot.emoji}
                  </span>
                  {/* Tooltip label */}
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap transition-all duration-300
                      ${isFixed
                        ? "bg-green-500/20 text-green-400 border border-green-400/30 opacity-100"
                        : "bg-dark-400/95 text-foreground/80 border border-white/10 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                      }
                    `}
                  >
                    {isFixed ? "Fixed!" : spot.label}
                  </span>
                </button>
              );
            })}

            {/* Victory overlay */}
            {done && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/25 backdrop-blur-[2px]">
                <p className="text-5xl mb-3 animate-bounce">🚀</p>
                <h3 className="text-2xl font-black text-white mb-1">Site Perfected!</h3>
                <p className="text-sm text-foreground/55 mb-5">Powered by ydrop.</p>
                <button
                  onClick={reset}
                  className="px-6 py-2.5 rounded-full bg-neon text-white text-sm font-bold hover:bg-neon-dark transition-all duration-300"
                  style={{ boxShadow: "0 0 24px rgba(255,0,0,0.45)" }}
                >
                  Play Again ↺
                </button>
              </div>
            )}

            {/* Confetti */}
            <Confetti active={confetti} />
          </div>
        </div>

        {/* Fix legend pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-8">
          {HOTSPOTS.map((spot) => (
            <span
              key={spot.id}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-500
                ${fixed.has(spot.id)
                  ? "border-green-400/40 bg-green-400/10 text-green-400"
                  : "border-white/10 bg-white/5 text-foreground/40"
                }`}
            >
              <span>{fixed.has(spot.id) ? "✓" : spot.emoji}</span>
              {spot.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
