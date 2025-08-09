import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work and case studies by Vaneeza M across design, prototyping, and web development.",
  alternates: { canonical: "/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}


