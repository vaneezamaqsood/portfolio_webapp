"use client";

import type { WorkItem } from "@/components/Sections";
import FigmaEmbed from "@/components/FigmaEmbed";
import Modal from "@/components/Modal";
import { WebsiteEmbed, MiroEmbed } from "@/components/EmbedCard";
import { useState } from "react";

export default function ProjectDetail({ item }: { item: WorkItem }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{item.title}</h1>
      {item.subtitle ? <p className="text-muted-foreground mt-2">{item.subtitle}</p> : null}
      <div className="mt-6 relative z-10">
        {item.href ? (
          item.external ? (
            <div className="flex items-center gap-3">
              <a className="underline" href={item.href} target="_blank" rel="noreferrer">
                Open resource ↗
              </a>
              <button
                type="button"
                className="rounded-full px-3 py-1 text-xs glass-outline hover:bg-foreground hover:text-background transition-colors"
                onClick={() => setOpen(true)}
              >
                Preview
              </button>
            </div>
          ) : null
        ) : null}
      </div>

      {item.figmaUrls?.length ? (
        <div className="mt-10 grid gap-6">
          {item.figmaUrls.map((u, idx) => (
            <FigmaEmbed key={u + idx} url={u} title={`${item.title} – Figma ${idx + 1}`} />
          ))}
        </div>
      ) : null}

      <p className="mt-10 text-muted-foreground">More detailed write-up coming soon.</p>

      <Modal open={open} onClose={() => setOpen(false)} title={item.title}>
        {/* Decide embed type by URL kind */}
        {item.href?.includes("figma.com") ? (
          <FigmaEmbed url={item.href} title={item.title} />
        ) : item.href?.includes("miro.com") ? (
          <MiroEmbed url={item.href} title={item.title} />
        ) : item.href ? (
          <WebsiteEmbed url={item.href} title={item.title} />
        ) : null}
      </Modal>
    </article>
  );
}


