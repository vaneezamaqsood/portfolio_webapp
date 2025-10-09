"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";

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
      <AuroraBackground className="absolute inset-0 -z-10 opacity-90"></AuroraBackground>

      <div className="grid gap-10 sm:gap-6 sm:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
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
            className="text-muted-foreground mt-4 max-w-prose"
          >
            Crafting human-centered products with motion-first interactions. I prototype in Figma, design systems, and code responsive web apps.
          </motion.p>
        </div>

        {/* Profile portrait with circular glass background */}
        <div className="relative h-56 w-56 sm:h-72 sm:w-72 mx-auto">
          {/* soft glow background */}
          <motion.div
            className="absolute -inset-2 -z-10 blur-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-transparent opacity-60"
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />

          {/* circular glass container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="absolute inset-0 rounded-full glass neon-ring overflow-hidden"
          >
            <Image
              src="/Vaneeza-Profile%20Picture.png"
              alt="Vaneeza profile portrait"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 14rem"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-7 right-0 left-0 text-center text-xs text-muted-foreground"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="#next-section"
              onClick={(e) => {
                e.preventDefault();
                gsap.to(window, {
                  duration: 0.9,
                  ease: "power2.out",
                  scrollTo: { y: "#next-section", x: window.scrollX },
                });
              }}
              className="underline-offset-4 hover:underline"
            >
              Scroll to explore ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


