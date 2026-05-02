"use client";

import { useEffect, useRef } from "react";

/* ── Orb definitions ────────────────────────────────────────── */
const ORBS = [
  { text: "const x = ()", size: 76 },
  { text: "<Component />", size: 84 },
  { text: "npm install", size: 70 },
  { text: "display: flex", size: 78 },
  { text: "useState()", size: 72 },
  { text: "SELECT *\nFROM db", size: 74 },
  { text: "async/await", size: 68 },
  { text: "{ ...props }", size: 80 },
];

interface OrbPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function CodeOrbs() {
  const divsRef = useRef<(HTMLDivElement | null)[]>([]);
  const physicsRef = useRef<OrbPhysics[]>([]);
  const rafRef = useRef<number | null>(null);
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    const W = window.innerWidth;
    const H = window.innerHeight;

    /* Seed physics state */
    physicsRef.current = ORBS.map((orb) => ({
      x: Math.random() * (W - orb.size),
      y: Math.random() * (H - orb.size),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: orb.size,
    }));

    const animate = () => {
      const vW = window.innerWidth;
      const vH = window.innerHeight;

      physicsRef.current.forEach((orb, i) => {
        /* Brownian perturbation */
        orb.vx += (Math.random() - 0.5) * 0.035;
        orb.vy += (Math.random() - 0.5) * 0.035;

        /* Speed cap */
        const spd = Math.hypot(orb.vx, orb.vy);
        if (spd > 0.55) { orb.vx *= 0.55 / spd; orb.vy *= 0.55 / spd; }

        /* Move */
        orb.x += orb.vx;
        orb.y += orb.vy;

        /* Edge bounce */
        if (orb.x < 0)             { orb.x = 0;              orb.vx =  Math.abs(orb.vx); }
        if (orb.x > vW - orb.size) { orb.x = vW - orb.size;  orb.vx = -Math.abs(orb.vx); }
        if (orb.y < 0)             { orb.y = 0;              orb.vy =  Math.abs(orb.vy); }
        if (orb.y > vH - orb.size) { orb.y = vH - orb.size;  orb.vy = -Math.abs(orb.vy); }

        /* Apply via transform — zero layout cost */
        const el = divsRef.current[i];
        if (el) el.style.transform = `translate(${orb.x}px, ${orb.y}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { divsRef.current[i] = el; }}
          className="absolute top-0 left-0 rounded-full flex items-center justify-center code-orb"
          style={{
            width: orb.size,
            height: orb.size,
            animationDelay: `${i * 0.55}s`,
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,0,0,0.10), rgba(255,0,0,0.03) 70%)",
            border: "1px solid rgba(255,0,0,0.14)",
            backdropFilter: "blur(6px)",
            boxShadow:
              "0 0 16px rgba(255,0,0,0.07), inset 0 0 12px rgba(255,0,0,0.04)",
          }}
        >
          <code
            style={{
              fontSize: "8px",
              lineHeight: 1.5,
              color: "rgba(255,100,100,0.55)",
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              textAlign: "center",
              padding: "6px",
              whiteSpace: "pre",
              userSelect: "none",
            }}
          >
            {orb.text}
          </code>
        </div>
      ))}
    </div>
  );
}
