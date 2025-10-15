"use client";

import { motion } from "framer-motion";
import { workItems } from "@/data/work";

export default function ProjectsShowcase() {
  const items = workItems.filter(w => !!w.href).slice(0, 8);
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-semibold tracking-tight text-center"
      >
        Projects
      </motion.h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((w, idx) => (
          <motion.a
            key={w.title + idx}
            href={w.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.04 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-yellow-500 via-amber-300 to-yellow-600 transition-opacity" />
            <div className="relative z-10">
              <div className="text-lg font-semibold text-amber-300">{w.title}</div>
              {w.subtitle ? <div className="text-sm opacity-70 mt-1">{w.subtitle}</div> : null}
              <div className="mt-3 text-xs uppercase tracking-wide opacity-60">{w.category}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}


