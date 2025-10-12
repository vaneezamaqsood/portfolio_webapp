import Hero from "@/components/Hero";
import type { Metadata } from "next";
import SkillsOrbit from "@/components/SkillsOrbit";

export default function Home() {
  return (
    <div className="pb-20">
      <section id="hero">
        <Hero />
      </section>
      <section id="skills" className="mx-auto max-w-6xl px-4 sm:px-6 mt-12">
        <SkillsOrbit />
      </section>
      <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">About</h2>
        <p className="text-muted-foreground mt-2 max-w-prose">
          I’m Vaneeza M — a UI/UX Designer and Front‑End Developer blending product thinking with motion-first UI.
        </p>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Home",
  description:
    "Vaneeza M — UI/UX Designer & Front‑End Developer. Explore selected work across product design, prototyping, and web development.",
  alternates: { canonical: "/" },
};
