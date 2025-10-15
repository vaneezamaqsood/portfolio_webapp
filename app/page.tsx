import Hero from "@/components/Hero";
import type { Metadata } from "next";
import LandingClassic from "@/components/LandingClassic";
import InteractiveSkills from "@/components/InteractiveSkills";
import ProjectsShowcase from "@/components/ProjectsShowcase";

export default function Home() {
  return (
    <div className="pb-20">
      <LandingClassic />
      <InteractiveSkills />
      <ProjectsShowcase />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Home",
  description:
    "Vaneeza M — UI/UX Designer & Front‑End Developer. Explore selected work across product design, prototyping, and web development.",
  alternates: { canonical: "/" },
};
