"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const SKILLS = [
  "UX/UI",
  "Interaction Design",
  "Design Systems",
  "Prototyping",
  "Next.js",
  "React",
  "Tailwind",
  "Framer Motion",
  "GSAP",
  "Figma",
  "Miro",
];

export default function InteractiveSkills() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-semibold tracking-tight text-center"
      >
        Interactive Skills
      </motion.h2>

      <motion.div style={{ scale, opacity }} className="mt-8 grid place-items-center">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {SKILLS.map((label, idx) => (
            <motion.div
              key={label}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              drag
              dragConstraints={{ top: -8, bottom: 8, left: -12, right: 12 }}
              dragElastic={0.2}
              className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-lg backdrop-blur"
            >
              <span className="relative z-10">{label}</span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-yellow-500/80 via-amber-300/90 to-yellow-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.span
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.08 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 bg-amber-400"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}


