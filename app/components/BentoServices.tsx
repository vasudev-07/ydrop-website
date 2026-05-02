"use client";

/* ─────────────────────────────────────────────────────────────
   Bento grid layout (4-col desktop):

   [ UI/UX Design ──────────────── col-span-3 ] [ Stat 3× ──── col-span-1 ]
   [ Web Eng ──── col-span-1 ] [ Growth Marketing ─ col-span-2 ] [ CTA ─────── col-span-1 ]
───────────────────────────────────────────────────────────── */

const UiUxIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const GrowthIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ── Shared card shell ──────────────────────────────────────── */
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        group relative rounded-3xl border border-white/10
        bg-white/5 backdrop-blur-lg
        p-7 sm:p-8
        overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-transparent
        bento-card
        ${className}
      `}
    >
      {/* Subtle radial glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(255,0,0,0.07),transparent_60%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ── Individual card types ─────────────────────────────────── */
function ServiceCard({
  icon,
  label,
  headline,
  description,
  tags,
}: {
  icon: React.ReactNode;
  label: string;
  headline: string;
  description: string;
  tags: string[];
}) {
  return (
    <>
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-neon/10 flex items-center justify-center text-neon mb-5 group-hover:bg-neon/20 transition-colors duration-300">
        {icon}
      </div>
      {/* Label */}
      <p className="text-neon text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
      {/* Headline */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight mb-3">
        {headline}
      </h3>
      {/* Body */}
      <p className="text-foreground/55 text-sm leading-relaxed mb-6">{description}</p>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-foreground/50 text-xs font-medium"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

function StatCard({
  stat,
  label,
  sub,
}: {
  stat: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <p className="text-5xl sm:text-6xl font-black text-neon leading-none tracking-tight">
        {stat}
      </p>
      <div className="mt-4">
        <p className="text-foreground text-base font-bold">{label}</p>
        <p className="text-foreground/50 text-sm mt-1 leading-relaxed">{sub}</p>
      </div>
    </div>
  );
}

function CtaCard() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-neon mb-3">Ready?</p>
        <h3 className="text-xl font-extrabold text-foreground leading-snug mb-3">
          Let&apos;s build your growth engine.
        </h3>
        <p className="text-foreground/50 text-sm leading-relaxed">
          From concept to launch, we handle it all.
        </p>
      </div>
      <a
        href="#contact"
        className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neon text-white text-sm font-bold transition-all duration-200 hover:bg-neon-dark hover:gap-3 self-start"
        style={{ boxShadow: "0 0 20px rgba(255,0,0,0.3)" }}
      >
        Get In Touch <ArrowIcon />
      </a>
    </div>
  );
}

/* ── Main export ───────────────────────────────────────────── */
export default function BentoServices() {
  return (
    <section id="what-we-do" className="py-24 sm:py-32 bg-dark-100 tech-grid">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className="section-heading text-foreground">Services Built for Growth</h2>
          <p className="section-subheading mx-auto mt-4">
            Three pillars that turn your website into a revenue engine.
          </p>
        </div>

        {/* ── Bento grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4">

          {/* Row 1 — UI/UX (3 cols) | Stat 3× (1 col) */}
          <BentoCard className="sm:col-span-2 lg:col-span-3">
            <ServiceCard
              icon={<UiUxIcon />}
              label="UI / UX Design"
              headline="Interfaces built to convert."
              description="Pixel-perfect designs rooted in user psychology — every layout, color, and micro-interaction engineered to guide visitors straight to action."
              tags={["User Research", "Wireframes", "Prototyping", "Design Systems"]}
            />
          </BentoCard>

          <BentoCard className="lg:col-span-1">
            <StatCard
              stat="3×"
              label="Avg. Revenue Lift"
              sub="Clients see measurable growth within the first quarter."
            />
          </BentoCard>

          {/* Row 2 — Web Eng (1 col) | Growth (2 cols) | CTA (1 col) */}
          <BentoCard className="lg:col-span-1">
            <ServiceCard
              icon={<CodeIcon />}
              label="Web Engineering"
              headline="Fast apps that scale."
              description="Next.js & React — built to rank on Google and built to last under any traffic load."
              tags={["Next.js", "React", "SEO", "Performance"]}
            />
          </BentoCard>

          <BentoCard className="sm:col-span-2 lg:col-span-2">
            <ServiceCard
              icon={<GrowthIcon />}
              label="Growth Marketing"
              headline="Campaigns that compound your revenue."
              description="End-to-end paid ads, content strategy, and conversion funnels — all tied back to measurable ROI and customer lifetime value."
              tags={["Paid Ads", "Analytics", "Funnels", "Content Strategy"]}
            />
          </BentoCard>

          <BentoCard className="lg:col-span-1">
            <CtaCard />
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
