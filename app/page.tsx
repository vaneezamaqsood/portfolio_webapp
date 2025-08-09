import Hero from "@/components/Hero";
import type { Metadata } from "next";
import { SectionHeading, WorkGrid } from "@/components/Sections";
import { CATEGORIES, itemsByCategory } from "@/data/work";

export default function Home() {
  return (
    <div className="pb-20">
      <Hero />
      <SectionHeading id="next-section" title="Selected Work" subtitle="A snapshot across design and code" />
      <WorkGrid items={[
        ...itemsByCategory(CATEGORIES.FIGMA).slice(0,2),
        ...itemsByCategory(CATEGORIES.WEB).slice(0,2),
        ...itemsByCategory(CATEGORIES.THINKING).slice(0,1),
      ]} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Home",
  description:
    "Vaneeza M — UI/UX Designer & Front‑End Developer. Explore selected work across product design, prototyping, and web development.",
  alternates: { canonical: "/" },
};
