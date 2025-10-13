"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { AuroraBackground } from "@/components/ui/aurora-background";
import PlasmaBackground from "@/components/PlasmaBackground";
import SkillsOrbit from "@/components/SkillsOrbit";

export default function Hero() {
  const headlineRef = useRef<HTMLSpanElement | null>(null);
  const rolesRef = useRef<HTMLSpanElement | null>(null);
  const rolesCaretRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Text generation for headline
    const text = "Hi! I am Vaneeza";
    if (!headlineRef.current) return;

    let isCancelled = false;
    headlineRef.current.textContent = "";

    const reveal = async () => {
      for (let i = 0; i < text.length; i += 1) {
        if (isCancelled) return;
        headlineRef.current!.textContent = text.slice(0, i + 1);
        await new Promise((r) => setTimeout(r, 45));
      }
    };

    reveal();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    // Rotating typewriter for roles
    const roles = ["UI/UX Designer", "Front End Dev", "Event Curator"];
    let isCancelled = false;
    let roleIndex = 0;

    const typeSpeed = 55;
    const eraseSpeed = 35;
    const holdMs = 950;

    const typeAndErase = async () => {
      while (!isCancelled) {
        const word = roles[roleIndex % roles.length];
        // Type
        for (let i = 0; i < word.length; i += 1) {
          if (isCancelled) return;
          if (rolesRef.current) rolesRef.current.textContent = word.slice(0, i + 1);
          await new Promise((r) => setTimeout(r, typeSpeed));
        }
        await new Promise((r) => setTimeout(r, holdMs));
        // Erase
        for (let i = word.length; i >= 0; i -= 1) {
          if (isCancelled) return;
          if (rolesRef.current) rolesRef.current.textContent = word.slice(0, i);
          await new Promise((r) => setTimeout(r, eraseSpeed));
        }
        roleIndex += 1;
      }
    };

    typeAndErase();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Removed morphing cursor effect per request

  return (
    <section id="hero" className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24">
      <AuroraBackground className="absolute inset-0 -z-20 opacity-60"></AuroraBackground>
      <PlasmaBackground className="absolute inset-0 -z-10 opacity-80" />

      <div className="flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight"
          >
            <span ref={headlineRef} />
            <br />
            <span className="text-primary/80">
              <span ref={rolesRef} />
              <span ref={rolesCaretRef} className="type-caret" aria-hidden>
                |
              </span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-muted-foreground mt-4 max-w-prose mx-auto"
          >
            Crafting human-centered products with motion-first interactions. I prototype in Figma, design systems, and code responsive web apps.
          </motion.p>
        </div>
      </div>
    </section>
  );
}


