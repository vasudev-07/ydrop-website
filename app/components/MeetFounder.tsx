"use client";

import Image from "next/image";

const HIGHLIGHTS = [
  { label: "Role",     value: "Founder & Creative Director" },
  { label: "Based In", value: "Bangalore, India" },
  { label: "Focus",    value: "Web · Design · Growth" },
  { label: "Mission",  value: "Turn ideas into revenue engines" },
];

export default function MeetFounder() {
  return (
    <section id="founder" className="py-24 sm:py-32 bg-dark-200">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            The Person Behind ydrop
          </p>
          <h2 className="section-heading text-foreground">Meet the Founder</h2>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Blob image ──────────────────────────── */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer glow ring (static, behind blob) */}
              <div
                className="absolute -inset-4 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,0,0,0.12) 0%, transparent 65%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Blob image wrapper */}
              <div
                className="animate-blob-float relative overflow-hidden"
                style={{
                  width: 360,
                  height: 400,
                  maxWidth: "90vw",
                  borderRadius: "60% 40% 55% 45% / 55% 60% 40% 45%",
                  border: "2px solid rgba(255,0,0,0.25)",
                  boxShadow:
                    "0 0 40px rgba(255,0,0,0.12), inset 0 0 30px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src="/founder.png"
                  alt="Vasudev H — Founder of ydrop"
                  fill
                  className="object-cover object-center scale-105"
                  priority
                />
                {/* Colour overlay tint */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-black/30" />
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/10 bg-dark-300/90 backdrop-blur-sm shadow-xl"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-neon animate-pulse" />
                <span className="text-xs font-semibold text-foreground/80">Open to new projects</span>
              </div>
            </div>
          </div>

          {/* ── Right: Typography ─────────────────────────── */}
          <div className="flex flex-col gap-7">

            {/* Quote */}
            <blockquote className="relative pl-5 border-l-2 border-neon">
              <p className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                &ldquo;I started ydrop because I was tired of agencies that
                charged premium rates for mediocre results. Every pixel we ship
                is accountable to your bottom line.&rdquo;
              </p>
            </blockquote>

            {/* Body copy */}
            <p className="text-foreground/55 leading-relaxed text-sm">
              With experience spanning UI/UX design, full-stack engineering, and
              performance marketing, Vasudev built ydrop to be the
              agency he always wished existed — one that obsesses over outcomes,
              not deliverables.
            </p>

            {/* Highlight grid */}
            <div className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/35 mb-1">
                    {h.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground/85">
                    {h.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/8" />

            {/* Signature block */}
            <div className="flex items-end gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/35 mb-1">
                  Founder &amp; Director
                </p>
                {/* Signature-style name */}
                <span
                  className="block leading-none text-foreground"
                  style={{
                    fontFamily: "var(--font-signature)",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    textShadow: "0 0 30px rgba(255,255,255,0.08)",
                  }}
                >
                  Vasudev H
                </span>
              </div>

              {/* Social pills */}
              <div className="flex gap-2 mb-1">
                <a
                  href="https://www.linkedin.com/in/vasudev-h-3b3724245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-white/10 bg-white/5 text-foreground/50 hover:text-neon hover:border-neon/40 hover:bg-neon/8 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/+917306140130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-white/10 bg-white/5 text-foreground/50 hover:text-neon hover:border-neon/40 hover:bg-neon/8 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
