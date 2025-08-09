import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Vaneeza M — UI/UX designer and front‑end developer who blends product thinking with motion-first UI to craft effortless experiences.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}


