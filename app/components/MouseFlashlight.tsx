"use client";

import { useEffect, useRef } from "react";

/**
 * MouseFlashlight
 * ───────────────
 * A fixed, full-viewport overlay that renders a radial gradient
 * spotlight centred on the user's cursor. pointer-events-none so
 * it never blocks clicks or hovers on underlying elements.
 *
 * CSS custom properties --x / --y are updated on every mousemove
 * via requestAnimationFrame for smooth, jank-free tracking.
 */
export default function MouseFlashlight() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    // Keep the spotlight off-screen until the first mouse move
    el.style.setProperty("--x", "-9999px");
    el.style.setProperty("--y", "-9999px");

    const onMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };

    const onMouseLeave = () => {
      // Fade out when the cursor leaves the window
      if (el) el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        opacity: 0,
        transition: "opacity 0.4s ease",
        background:
          "radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.06), transparent 40%)",
      }}
    />
  );
}
