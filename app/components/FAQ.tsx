"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What types of businesses do you work with?",
    a: "We work with startups, SMEs, and established brands across industries — from SaaS products and e-commerce stores to service businesses and agencies. If you need a high-performance web presence or a growth strategy, we can help.",
  },
  {
    q: "How long does a typical project take?",
    a: "A landing page or marketing site typically takes 1–2 weeks. A full-scale web application with custom design and integrations ranges from 3–8 weeks depending on scope. We always share a clear timeline upfront before any work begins.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We offer monthly retainer packages that include performance monitoring, content updates, SEO maintenance, and A/B testing. Think of us as your embedded growth team, not a one-and-done vendor.",
  },
  {
    q: "What is your pricing model?",
    a: "We charge project-based fees for defined scopes (website builds, campaigns) and monthly retainers for ongoing work. Every engagement starts with a free discovery call so we can scope accurately — no surprise invoices.",
  },
  {
    q: "Can you redesign my existing website without losing SEO rankings?",
    a: "Absolutely. We perform a full SEO audit before any redesign, preserve URL structures, set up proper 301 redirects, and migrate meta data with care. We've helped clients improve rankings during a redesign, not just maintain them.",
  },
  {
    q: "What makes ydrop different from other agencies?",
    a: "Most agencies hand you a beautiful site and disappear. We stay accountable to your revenue metrics. Every decision — design, copy, architecture — is made through the lens of conversion and growth, not aesthetics alone.",
  },
];

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/8 last:border-b-0">
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-semibold text-foreground/85 group-hover:text-foreground transition-colors duration-200">
          {faq.q}
        </span>

        {/* Animated chevron */}
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300"
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            borderColor: isOpen ? "rgba(255,0,0,0.4)" : undefined,
            background: isOpen ? "rgba(255,0,0,0.08)" : undefined,
          }}
        >
          <svg
            className="w-4 h-4 text-foreground/60 transition-colors duration-200"
            style={{ color: isOpen ? "var(--color-neon)" : undefined }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      {/* Answer — CSS grid-rows trick for smooth slide */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="overflow-hidden">
          <p className="text-foreground/55 text-sm leading-relaxed pb-5 pr-10">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-dark-100 tech-grid">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-neon text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="section-heading text-foreground">
            Questions We Get Asked
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Everything you need to know before we start building together.
          </p>
        </div>

        {/* Glassmorphic accordion card */}
        <div className="rounded-3xl border border-white/8 bg-white/3 backdrop-blur-lg px-6 sm:px-8 divide-y-0">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* CTA nudge */}
        <p className="text-center text-sm text-foreground/35 mt-8">
          Still have questions?{" "}
          <a href="#contact" className="text-neon hover:underline underline-offset-4">
            Drop us a message →
          </a>
        </p>
      </div>
    </section>
  );
}
