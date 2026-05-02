"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions";


/* ── Input component ────────────────────────────── */
function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
}) {
  const baseClass =
    "w-full px-4 py-3 rounded-xl bg-dark-400 border text-foreground placeholder-foreground/30 text-sm outline-none transition-all focus:ring-2 focus:ring-neon/40 focus:border-neon/50";
  const borderClass = error ? "border-red-500" : "border-white/10";

  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-2">
        {label} {!required && <span className="text-foreground/30 normal-case tracking-normal">(optional)</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          placeholder={placeholder}
          required={required}
          className={`${baseClass} ${borderClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`${baseClass} ${borderClass}`}
        />
      )}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ── Main Component ─────────────────────────────── */
const initialState: LeadFormState = { success: false, message: "" };

export default function GetInTouch() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Handle success: clear form and show inline message
  useEffect(() => {
    if (state.success) {
      setIsSuccess(true);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <footer id="contact" className="py-20 sm:py-28 bg-dark-300 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ── Left: Info Column ────────────────── */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              <span className="text-neon">Let&apos;s</span> Build Something Great
            </h2>
            <p className="text-foreground/55 leading-relaxed max-w-md mb-10">
              Whether you need a new website, a rebrand, or a full-scale
              marketing engine — we&apos;re ready to make it happen.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/40 mb-4">
                Contact
              </h3>
              <a href="mailto:ydropco@gmail.com" className="flex items-center gap-3 text-foreground/70 hover:text-neon transition-colors text-sm group">
                <span className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                  <svg className="w-5 h-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                ydropco@gmail.com
              </a>
              <a href="tel:+917306140130" className="flex items-center gap-3 text-foreground/70 hover:text-neon transition-colors text-sm group">
                <span className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                  <svg className="w-5 h-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                +91 73061 40130
              </a>
              <div className="flex items-center gap-3 text-foreground/70 text-sm">
                <span className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                Bangalore, India
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ──────────────── */}
          <div className="rounded-2xl border border-white/5 bg-dark-200 p-8 sm:p-10">
            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
            <form ref={formRef} action={formAction} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  label="Name"
                  name="name"
                  placeholder="John Doe"
                  required
                  error={state.errors?.name}
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  required
                  error={state.errors?.email}
                />
              </div>
              <FormField
                label="Company"
                name="company"
                placeholder="Your company name"
              />
              <FormField
                label="Project Details"
                name="details"
                placeholder="Tell us about your project, goals, and timeline..."
                required
                textarea
                error={state.errors?.details}
              />

              <button
                type="submit"
                disabled={pending}
                className="btn-neon w-full justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {pending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </>
                )}
              </button>
              {isSuccess && (
                <p className="text-sm text-white mt-4 border-l-2 border-[#FF0000] pl-2 animate-pulse">
                  Successfully sent!
                </p>
              )}
              {state.message && !state.success && (
                <p className="text-sm text-red-400 mt-4 border-l-2 border-red-500 pl-2">
                  {state.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-foreground/30">
          <p>&copy; {new Date().getFullYear()} ydrop. All rights reserved.</p>

          {/* Social pill badges */}
          <div className="flex items-center gap-3">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/vasudev-h-3b3724245"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-foreground/50 text-xs font-medium transition-all duration-200 hover:border-neon/50 hover:bg-neon/10 hover:text-neon hover:scale-105"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>

            {/* Fiverr */}
            <a
              href="https://www.fiverr.com/s/AymWKeP"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-foreground/50 text-xs font-medium transition-all duration-200 hover:border-neon/50 hover:bg-neon/10 hover:text-neon hover:scale-105"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.01c-.01-4.577-.003-5.254-.003-5.483 0-1.653.66-2.394 2.009-2.394V2.87c-1.997 0-3.93.981-3.93 3.53l.004 5.483h-1.318v1.63h1.318V24h1.93V13.513h1.01l-.01-1.63zM8.87 13.315c.499 0 .946.042 1.319.123.372.083.68.207.921.371.24.165.417.376.527.636.109.26.165.563.165.912 0 .69-.207 1.209-.62 1.559-.414.349-1.003.523-1.768.523H8.24v-4.124H8.87zm.243-1.63H6.31v8.812H8.24v-3.07h1.38c.56 0 1.05-.074 1.471-.223.42-.148.773-.36 1.056-.633.283-.273.496-.6.64-.979.142-.38.213-.804.213-1.27 0-.434-.072-.836-.216-1.203a2.543 2.543 0 0 0-.641-.955 3.005 3.005 0 0 0-1.054-.623 4.318 4.318 0 0 0-1.436-.224 5.82 5.82 0 0 0-.49-.002 6.01 6.01 0 0 0-.05.001v.369z" />
              </svg>
              Fiverr
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/+917306140130"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-foreground/50 text-xs font-medium transition-all duration-200 hover:border-neon/50 hover:bg-neon/10 hover:text-neon hover:scale-105"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <p>
            Designed &amp; built with{" "}
            <span className="text-neon">&hearts;</span> by ydrop
          </p>
        </div>
      </div>

    </footer>
  );
}
