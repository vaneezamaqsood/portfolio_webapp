"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { AuroraBackground } from "@/components/ui/aurora-background";
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
      <AuroraBackground className="absolute inset-0 -z-10 opacity-90"></AuroraBackground>

      <div className="flex items-center justify-center">
        {/* Centered Skills Orbit */}
        <div className="relative mx-auto w-full max-w-5xl">
          <SkillsOrbit />
        </div>
      </div>
    </section>
  );
}


