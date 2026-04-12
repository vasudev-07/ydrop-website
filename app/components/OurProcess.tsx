"use client";

const steps = [
  {
    number: "01",
    title: "Research & Audit",
    description:
      "We deep-dive into your brand, audience, competitors, and analytics to uncover hidden opportunities.",
  },
  {
    number: "02",
    title: "Execution & Launch",
    description:
      "From design to code to campaign setup — we build, test, and ship at velocity.",
  },
  {
    number: "03",
    title: "Scaling & Revenue",
    description:
      "Ongoing optimisation, A/B testing, and growth experiments to compound your returns month over month.",
  },
];

export default function OurProcess() {
  return (
    <section id="our-process" className="py-24 sm:py-32 bg-dark-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            Our Process
          </p>
          <h2 className="section-heading text-foreground">
            From Audit to Revenue
          </h2>
          <p className="section-subheading mx-auto mt-4">
            A proven three-phase framework that turns strategy into measurable
            growth.
          </p>
        </div>

        {/* Timeline — horizontal on md+, vertical on mobile */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-0.5 bg-gradient-to-r from-neon/60 via-neon to-neon/60" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Vertical line segment — mobile only */}
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute top-20 left-1/2 -translate-x-px w-0.5 h-[calc(100%+3rem)] bg-gradient-to-b from-neon/60 to-neon/20" />
                )}

                {/* Number circle */}
                <div className="relative z-10 w-20 h-20 rounded-full border-2 border-neon bg-dark-200 flex items-center justify-center mb-6">
                  <span className="text-neon text-2xl font-extrabold">
                    {step.number}
                  </span>
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full border border-neon/20 animate-glow-pulse" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-foreground/55 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
