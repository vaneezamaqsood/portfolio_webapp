import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Vaneeza M to collaborate on design and front‑end projects.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}


