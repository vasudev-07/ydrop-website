"use client";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: "UI/UX Design",
    description:
      "Pixel-perfect interfaces that feel intuitive, look stunning, and guide users effortlessly toward conversion.",
    tags: ["User Research", "Wireframes", "Prototyping", "Design Systems"],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: "Website Engineering",
    description:
      "Lightning-fast, SEO-optimised web applications built with modern frameworks that scale with your business.",
    tags: ["Next.js", "React", "Performance", "SEO"],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Growth Marketing",
    description:
      "End-to-end campaigns — paid ads, content, and funnels — engineered to compound your customer acquisition.",
    tags: ["Paid Ads", "Analytics", "Funnels", "Content"],
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="py-24 sm:py-32 bg-dark-100 tech-grid"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className="section-heading text-foreground">
            Services Built for Growth
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Three pillars that turn your website into a revenue engine.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="group relative rounded-2xl border border-white/5 bg-dark-300 p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-neon/30"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-neon/5 to-transparent" />

              {/* Neon bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-neon/10 flex items-center justify-center text-neon mb-6 group-hover:bg-neon/20 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {svc.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed text-sm mb-6">
                  {svc.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 text-foreground/50 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
