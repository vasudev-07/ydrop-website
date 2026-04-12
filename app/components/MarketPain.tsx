"use client";

import { useEffect, useRef, useState } from "react";

interface StatRing {
  percent: number;
  label: string;
  sublabel: string;
}

const stats: StatRing[] = [
  { percent: 30, label: "30%", sublabel: "Low Conversion Rates" },
  { percent: 45, label: "45%", sublabel: "Wasted Ad Spend" },
  { percent: 50, label: "50%", sublabel: "Conversion Lost" },
];

function CircleStat({
  percent,
  label,
  sublabel,
  visible,
}: StatRing & { visible: boolean }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          {/* Background ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          {/* Progress ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#FF0000"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={visible ? offset : circumference}
            className="transition-all duration-[1500ms] ease-out"
            style={{
              filter: "drop-shadow(0 0 8px rgba(255,0,0,0.5))",
            }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-extrabold text-neon">{label}</span>
        </div>
      </div>
      <p className="text-foreground/70 text-sm font-medium text-center max-w-[160px]">
        {sublabel}
      </p>
    </div>
  );
}

export default function MarketPain() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="market-pain"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-dark-200 tech-grid"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            The Market Pain
          </p>
          <h2 className="section-heading text-foreground">
            Why Businesses Struggle Online
          </h2>
          <p className="section-subheading mx-auto mt-4">
            These are the silent revenue killers most companies ignore.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          {stats.map((s) => (
            <CircleStat key={s.label} {...s} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
