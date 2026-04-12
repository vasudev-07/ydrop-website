"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center tech-grid-dense overflow-hidden"
    >
      {/* Radial glow behind content */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-neon/5 blur-[80px] sm:blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-neon/20 bg-neon/5 text-neon text-sm font-semibold tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-neon animate-glow-pulse" />
          Next-Gen Web &amp; Conversion Infrastructure
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animate-delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
          <span className="text-foreground">ydrop:</span>{" "}
          <span className="text-neon">We don&apos;t just build.</span>
          <br />
          <span className="text-foreground">
            We drive measurable growth.
          </span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up animate-delay-200 mt-6 text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          We fuse stunning UI/UX design with data-driven marketing — so every
          pixel converts and every campaign compounds your revenue.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="btn-neon animate-glow-pulse">
            Start Your Growth
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#what-we-do"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-all text-sm font-semibold"
          >
            See What We Do
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-up animate-delay-600 mt-20 flex flex-col items-center gap-2 text-foreground/30 text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
