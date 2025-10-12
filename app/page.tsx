import Hero from "@/components/Hero";
import type { Metadata } from "next";
import SkillsOrbit from "@/components/SkillsOrbit";

export default function Home() {
  return (
    <div className="pb-20">
      <Hero />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-12">
        <SkillsOrbit />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Home",
  description:
    "Vaneeza M — UI/UX Designer & Front‑End Developer. Explore selected work across product design, prototyping, and web development.",
  alternates: { canonical: "/" },
};
