"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/* Vertical snake path — fits in a ~220×480 viewBox */
const PATH =
  "M 110,20 C 185,20 185,120 110,120 C 35,120 35,240 110,240 C 185,240 185,360 110,360 C 35,360 35,460 110,460";

const CARS = [
  { label: "GROWTH", color: "#60A5FA", gap: 0  },
  { label: "PROFIT", color: "#A78BFA", gap: 38 },
  { label: "SCALE",  color: "#34D399", gap: 76 },
  { label: "LEADS",  color: "#F472B6", gap: 114},
];

const MILESTONES = [
  { t: 0,    label: "IDEAS"      },
  { t: 0.25, label: "STRATEGY"  },
  { t: 0.5,  label: "BUILD"     },
  { t: 0.75, label: "LAUNCH"    },
  { t: 1,    label: "CONVERT"   },
];

const GHOSTS = [
  { x: 175, y: 75,  d: "M0,14 L5,9 L10,11 L15,4 L20,1" },
  { x: 38,  y: 190, d: "M0,0 L20,0 M0,5 L15,5 M0,10 L10,10" },
  { x: 185, y: 300, d: "M-8,-8 L8,-8 L8,8 L-8,8 Z" },
];

export default function CoasterPanel() {
  const pathRef   = useRef<SVGPathElement>(null);
  const carRefs   = useRef<(SVGGElement | null)[]>([]);
  const ghostRefs = useRef<(SVGGElement | null)[]>([]);
  const plenRef   = useRef(0);
  const mileRef   = useRef<{ x: number; y: number; label: string; right: boolean }[]>([]);

  /* Scroll → motion value → spring */
  const scrollMV   = useMotionValue(0);
  const springProg = useSpring(scrollMV, { stiffness: 140, damping: 28, mass: 0.4 });
  const pathOffset = useTransform(springProg, [0, 1], [0, 1100]);

  /* Init */
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    plenRef.current = len;
    mileRef.current = MILESTONES.map((m) => {
      const pt = p.getPointAtLength(m.t * len);
      return { x: pt.x, y: pt.y, label: m.label, right: pt.x < 110 };
    });
  }, []);

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => {
      scrollMV.set(Math.min(1, Math.max(0, window.scrollY / window.innerHeight)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollMV]);

  /* Drive cars */
  useEffect(() => {
    const p = pathRef.current;
    return pathOffset.on("change", (val) => {
      const plen = plenRef.current;
      if (!p || !plen) return;

      const positions: { x: number; y: number }[] = [];

      CARS.forEach((car, i) => {
        const el = carRefs.current[i];
        if (!el) return;
        const raw = Math.max(0, Math.min(plen, val - car.gap));
        const d = 3;
        const p1 = p.getPointAtLength(Math.max(0, raw - d));
        const p2 = p.getPointAtLength(Math.min(plen, raw + d));
        const slope = (p2.y - p1.y) / (d * 2);
        const mo = Math.max(0, Math.min(plen, raw + slope * 12));
        const pt  = p.getPointAtLength(mo);
        const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
        el.setAttribute("transform", `translate(${pt.x},${pt.y}) rotate(${ang})`);
        positions.push({ x: pt.x, y: pt.y });
      });

      GHOSTS.forEach((ghost, j) => {
        const gEl = ghostRefs.current[j];
        if (!gEl) return;
        const minDist = Math.min(...positions.map((pos) => Math.hypot(pos.x - ghost.x, pos.y - ghost.y)));
        gEl.setAttribute("opacity", Math.max(0, 1 - minDist / 80).toFixed(3));
      });
    });
  }, [pathOffset]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 220 480"
        className="w-full h-full"
        style={{ maxHeight: "85vh" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="cpGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cpSoft" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {CARS.map((c, i) => (
            <linearGradient key={i} id={`cpg${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={c.color} stopOpacity="0.30" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0.07" />
            </linearGradient>
          ))}
        </defs>

        {/* Dashed rail */}
        <path d={PATH} fill="none" stroke="rgba(96,165,250,0.08)" strokeWidth="1" strokeDasharray="4 7" />
        {/* Live track */}
        <path ref={pathRef} d={PATH} fill="none" stroke="#60A5FA" strokeWidth="0.5" opacity="0.45" filter="url(#cpGlow)" />

        {/* Ghost UI */}
        {GHOSTS.map((g, i) => (
          <g key={i} ref={(el) => { ghostRefs.current[i] = el; }} transform={`translate(${g.x},${g.y})`} opacity="0">
            <path d={g.d} fill="none" stroke="#60A5FA" strokeWidth="0.8" strokeLinecap="round" />
            <circle r="3" fill="none" stroke="#60A5FA" strokeWidth="0.6" />
            <circle r="7" fill="none" stroke="#60A5FA" strokeWidth="0.3" opacity="0.4" />
          </g>
        ))}

        {/* Milestone dots + labels */}
        {mileRef.current.map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy={m.y} r="3" fill="#0A0A0A" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7" />
            <text
              x={m.right ? m.x + 10 : m.x - 10}
              y={m.y + 1}
              textAnchor={m.right ? "start" : "end"}
              dominantBaseline="middle"
              fill="rgba(96,165,250,0.4)"
              fontSize="6"
              fontWeight="700"
              letterSpacing="1"
            >
              {m.label}
            </text>
          </g>
        ))}

        {/* Coaster cars */}
        {CARS.map((car, i) => (
          <g key={i} ref={(el) => { carRefs.current[i] = el; }} transform="translate(-300,-300)">
            <rect x="-18" y="-7" width="36" height="14" rx="7"
              fill="none" stroke={car.color} strokeWidth="0.5" opacity="0.3" filter="url(#cpSoft)" />
            <rect x="-17" y="-6.5" width="34" height="13" rx="6.5" fill={`url(#cpg${i})`} />
            <rect x="-17" y="-6.5" width="34" height="13" rx="6.5"
              fill="none" stroke={car.color} strokeWidth="0.7" opacity="0.85" />
            <rect x="-13" y="-5" width="26" height="4" rx="2" fill="white" opacity="0.06" />
            <text x="0" y="0.5" textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize="4.5" fontWeight="800" letterSpacing="1.5"
              style={{ fontFamily: "var(--font-geist, var(--font-inter), sans-serif)" }}>
              {car.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
