"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions, Engine } from "@tsparticles/engine";

/* ── Particle config ────────────────────────────────────────────
   Performance targets:
   • fpsLimit 30     — halves GPU/CPU vs 60fps
   • detectRetina    — crisp on HiDPI without doubling particle count
   • No interactivity events, no links, no collision
   • move.angle gives organic wobble without the heavier wobble plugin
──────────────────────────────────────────────────────────────── */
const OPTIONS: ISourceOptions = {
  fpsLimit: 30,
  detectRetina: true,
  background: { color: { value: "transparent" } },

  particles: {
    number: {
      value: 160,
      density: { enable: true, width: 1280, height: 900 },
    },

    /* Mostly white, ~12% neon-red accent */
    color: {
      value: ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#FF0000"],
    },

    opacity: {
      value: { min: 0.05, max: 0.42 },
      animation: {
        enable: true,
        speed: 0.35,
        sync: false,
        startValue: "random" as const,
      },
    },

    size: {
      value: { min: 0.4, max: 2.2 },
    },

    /* Antigravity drift: direction "top", angle deviation → organic wobble */
    move: {
      enable: true,
      direction: "top" as const,
      speed: { min: 0.15, max: 0.65 },
      straight: false,
      random: true,
      outModes: { default: "out" as const }, // exit top → respawn bottom (seamless)
      angle: {
        value: 20,   // ±20° wobble from vertical
        offset: 0,
      },
    },

    shape: { type: "circle" },
  },

  interactivity: {
    detectsOn: "window" as const,
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
      resize: { enable: true },
    },
  },
};

/* ── Singleton engine init — runs once per app lifecycle ─────── */
let engineReady = false;
let enginePromise: Promise<void> | null = null;

async function ensureEngine(engine: Engine) {
  await loadSlim(engine);
}

export default function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (engineReady) { setReady(true); return; }
    if (!enginePromise) {
      enginePromise = initParticlesEngine(ensureEngine).then(() => {
        engineReady = true;
      });
    }
    enginePromise.then(() => setReady(true));
  }, []);

  const onLoaded = useCallback(async () => {}, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      particlesLoaded={onLoaded}
      options={OPTIONS}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
