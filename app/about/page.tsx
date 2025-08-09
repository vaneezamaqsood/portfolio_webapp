"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl sm:text-4xl font-semibold tracking-tight"
      >
        About
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mt-4 text-muted-foreground"
      >
        I'm Vaneeza M — a UI/UX Designer and Front‑End Developer. I blend product thinking with motion-first UI to craft experiences that feel effortless.
      </motion.p>
      <div className="mt-8 grid gap-6">
        <div>
          <h2 className="text-lg font-medium">What I do</h2>
          <ul className="list-disc pl-5 mt-2 text-muted-foreground">
            <li>Rapid prototyping in Figma and validating flows</li>
            <li>Design systems and component libraries (shadcn/ui, Radix)</li>
            <li>Responsive web development with React, Next.js, Tailwind</li>
            <li>Motion and micro-interactions with Framer Motion</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-medium">Toolbox</h2>
          <p className="text-muted-foreground mt-2">Figma, Miro, Next.js, React, Tailwind CSS, Framer Motion, GSAP</p>
        </div>
      </div>
    </div>
  );
}

