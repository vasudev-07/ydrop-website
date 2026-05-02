"use client";

/* ── Tech Brand Logos ─────────────────────────────────────────
   Each logo: SVG with its brand color applied via `fill` / `stroke`.
   The wrapper applies grayscale(100%) at rest → grayscale(0) on hover.
──────────────────────────────────────────────────────────────── */

const logos: { name: string; color: string; svg: React.ReactNode }[] = [
  {
    name: "Next.js",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 180 180" fill="currentColor" className="w-8 h-8">
        <path d="M87.5 0C39.1 0 0 39.1 0 87.5S39.1 175 87.5 175 175 135.9 175 87.5 135.9 0 87.5 0zm39.4 124.4L62.6 41.2H50.3v92.5h12.3V60.7l58.3 76.7c.9-.9 1.7-1.8 2.5-2.8l3.5-4.7c.1-.1.2-.3.2-.5zM121 41.2h-12.3v92.5H121V41.2z" />
      </svg>
    ),
  },
  {
    name: "React",
    color: "#61DAFB",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-9 h-9">
        <ellipse cx="12" cy="12" rx="10.5" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <rect width="24" height="24" rx="2" />
        <path
          fill="white"
          d="M13.5 12.5h2v5h-2v-5zm-1.25-1.5H15v1.5H7v-1.5h3V6h2.25v5zM7 14.5h2.75v1.5H7v-1.5zm0 2H9v1.5H7V16.5z"
        />
        <path
          fill="white"
          d="M13 11h2.5c1.4 0 2.5 1.1 2.5 2.5S16.9 16 15.5 16H13v-1.5h2.5c.55 0 1-.45 1-1s-.45-1-1-1H13V11z"
        />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    color: "#06B6D4",
    svg: (
      <svg viewBox="0 0 54 33" fill="currentColor" className="w-10 h-6">
        <path d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 12.672 33.808 16 40.5 16c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.328 33.692 0 27 0zM13.5 16C6.3 16 1.8 19.6 0 26.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C17.244 28.672 20.308 32 27 32c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.328 20.192 16 13.5 16z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    color: "#3ECF8E",
    svg: (
      <svg viewBox="0 0 109 113" fill="currentColor" className="w-7 h-8">
        <path d="M63.7 110.3c-2.6 3.3-8 1.5-8-2.7V67h29.4c5.3 0 8.3 6.1 5 10.2L63.7 110.3z" />
        <path
          opacity="0.5"
          d="M45.3 2.7c2.6-3.3 8-1.5 8 2.7V46H23.9c-5.3 0-8.3-6.1-5-10.2L45.3 2.7z"
        />
      </svg>
    ),
  },
  {
    name: "Stripe",
    color: "#635BFF",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.1 7.5c0-.8.7-1.1 1.8-1.1 1.6 0 3.6.5 5.2 1.4V3.5C16.4 2.6 14.6 2 12.9 2 9 2 6.4 4 6.4 7.6c0 5.6 7.7 4.7 7.7 7.1 0 .9-.8 1.2-2 1.2-1.7 0-3.9-.7-5.6-1.7v4.4C8 19.5 10 20 12 20c4 0 6.7-2 6.7-5.6-.1-6-7.6-4.9-7.6-6.9z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 1155 1000" fill="currentColor" className="w-8 h-7">
        <path d="M577.3 0L1154.6 1000H0L577.3 0z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

/* ── Logo pill ──────────────────────────────────────────────── */
function LogoPill({ logo }: { logo: (typeof logos)[number] }) {
  return (
    <div
      className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/8 bg-white/3 mx-3 cursor-default select-none logo-pill"
      style={{ "--brand-color": logo.color } as React.CSSProperties}
    >
      <span className="logo-icon" style={{ color: logo.color }}>
        {logo.svg}
      </span>
      <span className="text-sm font-semibold tracking-tight text-foreground/60 logo-label whitespace-nowrap">
        {logo.name}
      </span>
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────── */
export default function TechMarquee() {
  return (
    <section className="py-14 bg-dark-200 border-y border-white/5 overflow-hidden relative">
      {/* Section label */}
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-foreground/30 mb-8">
        Built with the world&apos;s best tools
      </p>

      {/* Fade edges via maskImage */}
      <div
        className="marquee-track relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* Scrolling strip — duplicated for seamless loop */}
        <div className="animate-marquee flex w-max">
          {[...logos, ...logos].map((logo, i) => (
            <LogoPill key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
