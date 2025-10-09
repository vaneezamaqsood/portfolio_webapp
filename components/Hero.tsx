"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";

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

        {/* Interactive 3D block */}
        <div className="relative h-56 sm:h-72 mx-auto w-full">
          <Card className="w-full h-full bg-black/[0.96] relative overflow-hidden">
            <Spotlight className="-top-40 left-0 md:left-20 md:-top-10" fill="white" />
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </Card>

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


