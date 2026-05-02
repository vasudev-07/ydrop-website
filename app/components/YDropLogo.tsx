"use client";

import { useId } from "react";
import { motion } from "framer-motion";

/* ── YDrop animated logo ────────────────────────────────────────
   Fix notes:
   • useId() ensures gradient/filter IDs are unique per instance
     (Navbar renders one logo — no duplicate ID conflict)
   • Direct initial/animate on each path (no useAnimation variants)
   • Idle glow: standalone motion.div with repeat:Infinity
   • Hover: spring bounce via whileHover
──────────────────────────────────────────────────────────────── */

interface Props {
  size?: number;
}

export default function YDropLogo({ size = 40 }: Props) {
  const uid      = useId();
  const gradId   = `ydg-${uid}`;
  const filterId = `ydf-${uid}`;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Idle glow ring — pulses after paths finish drawing (delay 1.3s) */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 0.55, 0], scale: [0.7, 1.35, 0.7] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.3,
          repeatDelay: 0.6,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(96,165,250,0.4) 0%, rgba(129,140,248,0.15) 55%, transparent 75%)",
        }}
      />

      {/* SVG */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        overflow="visible"
        whileHover={{ scale: 1.18, y: -2 }}
        transition={{ type: "spring", stiffness: 380, damping: 10 }}
        style={{ cursor: "pointer" }}
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="8" y1="6" x2="20" y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>

          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left arm + descender + tail */}
        <motion.path
          d="M 8,6 L 20,20 L 20,31 Q 20,37 14,35"
          stroke={`url(#${gradId})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        />

        {/* Right arm */}
        <motion.path
          d="M 32,6 L 20,20"
          stroke={`url(#${gradId})`}
          strokeWidth="2.8"
          strokeLinecap="round"
          filter={`url(#${filterId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
        />

        {/* Convergence dot */}
        <motion.circle
          cx="20" cy="20" r="2.2"
          fill={`url(#${gradId})`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ delay: 0.95, type: "spring", stiffness: 320, damping: 12 }}
          style={{ transformOrigin: "20px 20px" }}
        />

        {/* Tail tip dot */}
        <motion.circle
          cx="13.5" cy="35" r="1.4"
          fill={`url(#${gradId})`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 300, damping: 14 }}
          style={{ transformOrigin: "13.5px 35px" }}
        />
      </motion.svg>
    </div>
  );
}
