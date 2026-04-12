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
              <a href="mailto:redvoltteam@gmail.com" className="flex items-center gap-3 text-foreground/70 hover:text-neon transition-colors text-sm group">
                <span className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                  <svg className="w-5 h-5 text-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                redvoltteam@gmail.com
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
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/30">
          <p>&copy; {new Date().getFullYear()} ydrop. All rights reserved.</p>
          <p>
            Designed &amp; built with{" "}
            <span className="text-neon">&hearts;</span> by ydrop
          </p>
        </div>
      </div>

    </footer>
  );
}
