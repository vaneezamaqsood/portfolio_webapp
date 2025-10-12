// app/components/SkillsOrbit.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
type Project = { title: string; link?: string; year?: string };
type Skill = { key: string; label: string; color?: string; projects: Project[] };

// --- Demo data: replace with yours ---
const SKILLS: Skill[] = [
  {
    key: "react",
    label: "React",
    color: "#61dafb",
    projects: [
      { title: "Portfolio WebApp (Next.js)", year: "2025", link: "/work/portfolio" },
      { title: "Dashboard UI Widgets", year: "2025" },
    ],
  },
  {
    key: "tailwind",
    label: "TailwindCSS",
    color: "#38bdf8",
    projects: [
      { title: "Design System Tokens", year: "2025" },
      { title: "Marketing Landing Page", year: "2024" },
    ],
  },
  {
    key: "nextjs",
    label: "Next.js",
    color: "#000000",
    projects: [
      { title: "Contact Form (SMTP)", year: "2025", link: "/contact" },
      { title: "Image Optimized Blog", year: "2024" },
    ],
  },
  {
    key: "figma",
    label: "Figma",
    color: "#a259ff",
    projects: [
      { title: "Component Library", year: "2025" },
      { title: "Mobile Wireframes", year: "2024" },
    ],
  },
  {
    key: "vercel",
    label: "Vercel",
    color: "#111827",
    projects: [
      { title: "CI/CD Pipeline", year: "2025" },
    ],
  },
];

// Utility to compute positions around a circle
function useOrbitPositions(count: number, radius = 180) {
  return useMemo(() => {
    const step = (2 * Math.PI) / count;
    return new Array(count).fill(0).map((_, i) => {
      const angle = i * step - Math.PI / 2; // start at top
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { x, y };
    });
  }, [count]);
}

export default function SkillsOrbit() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const positions = useOrbitPositions(SKILLS.length, 180);

  const activeSkill = SKILLS.find((s) => s.key === active) || null;

  // Auto-open when this section enters viewport
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let opened = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!opened && entry.isIntersecting && entry.intersectionRatio > 0.25) {
            opened = true;
            setOpen(true);
          }
        });
      },
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto grid place-items-center min-h-[600px] w-full overflow-hidden rounded-2xl bg-neutral-950 text-neutral-100">
      {/* Center Tab */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="relative z-20 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-lg font-semibold backdrop-blur transition hover:bg-white/10"
        whileTap={{ scale: 0.98 }}
        aria-expanded={open}
        aria-controls="skills-orbit"
      >
        {open ? "Hide skills" : "Skills"}
      </motion.button>

      {/* Orbiting skill chips */}
      <div id="skills-orbit" className="pointer-events-none absolute inset-0 grid place-items-center">
        {SKILLS.map((s, i) => (
          <AnimatePresence key={s.key}>
            {open && (
              <motion.button
                key={s.key}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  x: positions[i].x,
                  y: positions[i].y,
                  scale: 1,
                }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 320, damping: 24, delay: i * 0.06 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((prev) => (prev === s.key ? null : s.key));
                }}
                className="pointer-events-auto absolute z-10 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur hover:bg-white/20"
                style={{ color: s.color === "#000000" ? "#fff" : s.color }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                aria-haspopup="dialog"
                aria-expanded={active === s.key}
                aria-label={`Open ${s.label} projects`}
              >
                {s.label}
              </motion.button>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Project panel removed per request to keep orbit fully visible */}

      {/* subtle gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(80,80,255,0.12),rgba(0,0,0,0))]" />
    </div>
  );
}

// --- How to use ---
// 1) Install:  npm install framer-motion
// 2) Ensure TailwindCSS is set up in your Next.js app (or replace classes with your CSS)
// 3) Import in a page:  import SkillsOrbit from "@/components/SkillsOrbit";
// 4) Use in JSX: <SkillsOrbit />
// 5) Edit SKILLS array above to add your real skills and projects.


